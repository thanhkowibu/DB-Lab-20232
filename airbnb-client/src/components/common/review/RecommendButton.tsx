type LikeButtonProps = {
  isRecommended: boolean;
  setIsRecommended: (isRecommended: boolean) => void;
};

export const RecommendButton: React.FC<LikeButtonProps> = ({
  isRecommended,
  setIsRecommended,
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 w-full rounded-lg ${
        isRecommended
          ? "bg-blue-500 text-white"
          : "bg-black text-white"
      }`}
      onClick={() => setIsRecommended(!isRecommended)}
    >
      {isRecommended
        ? "I recommend this product 👍"
        : "I dont recommend this product 👎"}
    </button>
  );
};
