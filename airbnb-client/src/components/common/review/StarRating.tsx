import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

interface StarRatingInterface {
  rating: number;
  setRating: (arg0: number) => void;
  size?: number;
  className?: string;
}

export const StarRating = ({
  rating,
  setRating,
  size = 6,
  className,
}: StarRatingInterface) => {
  return (
    <div
      className={cn("flex justify-center gap-2", className)}
    >
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden" // this hides the radio input
            />
            <FaStar
              className={`h-${size} w-${size} ${
                ratingValue <= rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </label>
        );
      })}
    </div>
  );
};
