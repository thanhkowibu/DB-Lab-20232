import Slider from "react-slider";
import { PiMinusLight } from "react-icons/pi";

type Props = {
  title: string;
  subtitle: string;
  minPrice: number;
  maxPrice: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
};

const PriceSlider: React.FC<Props> = ({
  title,
  subtitle,
  minPrice,
  maxPrice,
  onChangeMin,
  onChangeMax,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-between">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-gray-600">{subtitle}</div>
      <div className="mx-6">
        <Slider
          value={[minPrice, maxPrice]}
          min={10}
          max={1000}
          onChange={(value) => {
            onChangeMin(value[0]);
            onChangeMax(value[1]);
          }}
          renderTrack={(props, state) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key} // Add the key prop directly here
                {...restProps}
                className={
                  state.index === 0
                    ? "slider-track slider-track-0"
                    : state.index === 1
                    ? "slider-track slider-track-1"
                    : "slider-track slider-track-2"
                }
              />
            );
          }}
          renderThumb={(props) => {
            const { key, ...restProps } = props;
            return <div key={key} {...restProps} className="slider-thumb" />;
          }}
        />
      </div>
      <div className="flex justify-around gap-4 relative py-6">
        <div className="relative h-16 w-2/5">
          <span className="absolute left-3 top-3 transform -translate-y-1/2 text-xs text-neutral-400">
            Minimum
          </span>
          <span className="absolute left-3 top-8 transform -translate-y-1/2 text-xl text-black">
            $
          </span>
          <input
            id="price"
            className="border border-gray-400 size-full rounded-lg active:border-gray-950 p-6 no-scrollbar text-xl items-center flex justify-center pl-7"
            value={minPrice}
            onChange={(e) => {
              const newPrice =
                e.target.value === "" ? 0.0 : parseFloat(e.target.value);
              onChangeMin(newPrice);
            }}
          />
        </div>
        <div className="h-full flex items-center">
          <PiMinusLight />
        </div>
        <div className="relative h-16 w-2/5">
          <span className="absolute left-3 top-3 transform -translate-y-1/2 text-xs text-neutral-400">
            Maximum
          </span>
          <span className="absolute left-3 top-8 transform -translate-y-1/2 text-xl text-black">
            $
          </span>
          <input
            id="price"
            className="border border-gray-400 size-full rounded-lg active:border-gray-950 p-6 no-scrollbar text-xl items-center flex justify-center pl-7"
            value={maxPrice}
            onChange={(e) => {
              const newPrice =
                e.target.value === "" ? 0.0 : parseFloat(e.target.value);
              onChangeMax(newPrice);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
