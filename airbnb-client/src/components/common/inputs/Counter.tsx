import { cn } from "@/lib/utils";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  zero_allowed?: boolean;
  maxReached?: boolean;
};

const Counter: React.FC<Props> = ({
  title,
  subtitle,
  value,
  onChange,
  zero_allowed,
  maxReached,
}) => {
  const onAdd = () => {
    if (value >= 30 || maxReached) return;
    onChange(value + 1);
  };
  const onReduce = () => {
    if (zero_allowed ? value <= 0 : value <= 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4 select-none">
        <div
          onClick={onReduce}
          className={cn(
            "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:border-black transition",
            {
              "opacity-40 hover:border-gray-400 cursor-not-allowed":
                zero_allowed ? value <= 0 : value <= 1,
            }
          )}
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className={cn(
            "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:border-black transition",
            {
              "opacity-40 hover:border-gray-400 cursor-not-allowed":
                value >= 30 || maxReached,
            }
          )}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
