import Map, { Marker } from "react-map-gl";
import { FaHouse } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  lat: number;
  long: number;
};

const ListingMap: React.FC<Props> = ({ lat, long }) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-3xl font-semibold mt-4">Where you’ll be</div>
      <div className="h-[445px] w-[1150px] rounded-xl overflow-hidden shadow-md">
        <Map
          initialViewState={{
            latitude: lat,
            longitude: long,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={TOKEN}
        >
          <Marker latitude={lat} longitude={long}>
            <div className=" bg-rose-500/20 flex items-center justify-center rounded-full p-8 text-lg font-semibold cursor-pointer border shadow-lg">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className=" bg-rose-500 flex items-center justify-center rounded-full p-3 text-lg font-semibold cursor-pointer">
                      <FaHouse size={24} fill="white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={10}>
                    <p className=" text-neutral-600">
                      Exact location will be provided after booking
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default ListingMap;
