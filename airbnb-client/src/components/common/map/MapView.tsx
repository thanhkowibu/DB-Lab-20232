import { PropertyOverviewProps } from "@/types/properties.types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, Popup, MapRef } from "react-map-gl";
import { ListingCard } from "../listings/ListingCard";
import PricePin from "./PricePin";

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  listings: PropertyOverviewProps[] | null;
  isVisible: boolean;
};

export const MapView: React.FC<Props> = ({ listings, isVisible }) => {
  const [popupInfo, setPopupInfo] = useState<PropertyOverviewProps | null>(
    null
  );
  const mapRef = useRef<MapRef>(null);

  // Compute bounding box
  const bounds = useMemo(() => {
    if (!listings || listings.length === 0) return null;

    const lats = listings.map((listing) => listing.latitude);
    const lngs = listings.map((listing) => listing.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return [minLng, minLat, maxLng, maxLat] as [number, number, number, number];
  }, [listings]);

  const pins = useMemo(
    () =>
      listings?.map((data, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={data.longitude}
          latitude={data.latitude}
          anchor="top"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          <PricePin price={data.nightly_price} />
        </Marker>
      )),
    [listings]
  );

  // Fit bounds to include all markers
  useEffect(() => {
    const fitBoundsToMarkers = () => {
      if (bounds && mapRef.current && isVisible) {
        mapRef.current.fitBounds(bounds, { padding: 20, duration: 2000 });
      }
    };

    // Adding a slight delay to ensure the map is fully initialized
    if (isVisible) {
      setTimeout(fitBoundsToMarkers, 100); // Adjust the delay as needed
    }
  }, [bounds, isVisible]);

  return (
    <div className="h-full max-h-full w-full">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: listings ? listings[0].latitude : 21.001823,
          longitude: listings ? listings[0].longitude : 105.846263,
          zoom: 7,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <ListingCard data={popupInfo} />
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
