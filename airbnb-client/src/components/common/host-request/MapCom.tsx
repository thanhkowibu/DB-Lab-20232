/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map, Marker } from "react-map-gl";
import { GeocoderControl } from "../create/GeocoderControl";
import { useState } from "react";

export const MapCom = () => {
  const TOKEN = import.meta.env
    .VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const [viewport, setViewport] = useState({
    latitude: 21.001823,
    longitude: 105.846263,
    zoom: 15,
  });

  const handleMove = (evt: any) => {
    const { latitude, longitude, zoom } = evt.viewState;
    setViewport({
      latitude,
      longitude,
      zoom,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <div className="h-[450px] w-[700px]">
        <Map
          {...viewport}
          onMove={handleMove}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={TOKEN}
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
          />
          <GeocoderControl
            mapboxAccessToken={TOKEN}
            position="top-left"
            marker={false}
            onLoading={() => {}}
            onResults={() => {}}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
};
