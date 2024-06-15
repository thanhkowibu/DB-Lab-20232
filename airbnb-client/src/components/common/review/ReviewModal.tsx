import { Modal } from "../navbar/modals/Modal";
import toast from "react-hot-toast";
import reviewApi from "@/api/modules/review.api";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { RecommendButton } from "./RecommendButton";

type Props = {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onReviewSuccess: () => void;
};

type reviewDetail = {
  content: string;
  rating: number;
  is_recommend: boolean;
};

const ReviewModal: React.FC<Props> = ({
  id,
  isOpen,
  setIsOpen,
  onReviewSuccess,
}) => {
  const [data, setData] = useState<reviewDetail>({
    content: "",
    rating: 5,
    is_recommend: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    try {
      if (!data.content) {
        toast.error("Content can not be empty!");
        return;
      }
      if (data.content.length > 300) {
        toast.error(
          "Review cant have more than 300 characters."
        );
        return;
      }
      setIsLoading(true);
      // alert("Submit form");
      // console.log(data);
      // onReviewSuccess();
      // return;
      const res = await reviewApi.add(BigInt(id), data);

      if (res.code === 200) {
        toast.success("Review added successfully");
        onReviewSuccess();
        onClose();
      } else {
        throw new Error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating"
          ? Number(value)
          : value,
    });
  };

  const handleChangeRating = (newRating: number) => {
    setData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleChangeReview = (newRec: boolean) => {
    setData((prev) => ({ ...prev, is_recommend: newRec }));
  };

  const bodyContent = (
    <div className="px-4">
      <div className="mb-4 text-center">
        <label
          htmlFor="rating"
          className="block text-xl font-bold mb-2"
        >
          Rating
        </label>
        <StarRating
          rating={data.rating}
          setRating={handleChangeRating}
          size={10}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-lg font-medium"
        >
          Review
        </label>
        <textarea
          name="content"
          id="content"
          value={data.content}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none h-64 px-4 py-3 font-medium text-lg"
        />
      </div>
      <div className="mb-4">
        <RecommendButton
          isRecommended={data.is_recommend}
          setIsRecommended={handleChangeReview}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      title="Your thoughts on this trip"
      actionLabel="Add review"
      secondaryLabel="I'll think about it later 🤔"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default ReviewModal;
