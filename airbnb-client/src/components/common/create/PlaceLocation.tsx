import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { GeocoderControl } from "./GeocoderControl";
import { UseFormSetValue } from "react-hook-form";
import { PropertyReqProps } from "@/types/properties.types";

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

type PlaceLocationProps = {
  form: {
    latitude: number;
    longitude: number;
  };
  setValue: UseFormSetValue<PropertyReqProps>;
};

export const PlaceLocation = ({ form, setValue }: PlaceLocationProps) => {
  const [viewport, setViewport] = useState({
    latitude: form.latitude ? form.latitude : 21.001823,
    longitude: form.longitude ? form.longitude : 105.846263,
    zoom: 15,
  });

  const getResults = ({ result }: any) => {
    const [longitude, latitude] = result?.geometry?.coordinates;
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  const handleMove = (evt: any) => {
    const { latitude, longitude, zoom } = evt.viewState;
    setViewport({
      latitude,
      longitude,
      zoom,
    });
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <h2 className="font-semibold text-4xl">
        Where is your place settled on?
      </h2>
      <p>
        Your address is only shared with guests after they've made a
        reservation.
      </p>
      <div className="h-[450px] w-[700px] ">
        <Map
          {...viewport}
          onMove={handleMove}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={TOKEN}
        >
          <Marker latitude={viewport.latitude} longitude={viewport.longitude} />
          <GeocoderControl
            mapboxAccessToken={TOKEN}
            position="top-left"
            marker={false}
            onLoading={() => {}}
            onResults={() => {}}
            onResult={getResults}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
};
