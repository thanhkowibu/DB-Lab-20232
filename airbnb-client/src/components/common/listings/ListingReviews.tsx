import reviewApi from "@/api/modules/review.api";
import { ReviewProps } from "@/types/properties.types";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { PaginationControl } from "../PaginationControl";
import ReviewItem from "./ReviewItem";

type Props = {
  id: bigint;
};

const ListingReviews: React.FC<Props> = ({ id }) => {
  const [reviews, setReviews] = useState<ReviewProps[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const reviewSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { pagination_meta_data, reviews } = (
          await reviewApi.getAll(id, page)
        ).data;
        if (pagination_meta_data) setLastPage(pagination_meta_data.last_page);
        if (reviews) setReviews(reviews);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    if (page !== 1 && reviewSectionRef.current) {
      const navbarHeight = 80;
      const reviewsElement = reviewSectionRef.current;

      if (reviewsElement) {
        const yOffset =
          reviewsElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: yOffset - navbarHeight });
      }
    }
  }, [page]);

  return (
    <div className="flex flex-col gap-12" ref={reviewSectionRef}>
      <div className="text-3xl font-semibold mt-4">Review on this place</div>
      {reviews?.length ? (
        <>
          <div className="w-full grid grid-cols-2 gap-16">
            {reviews?.map((review) => (
              <ReviewItem
                key={review.id} // Add a key here
                id={review.id}
                content={review.content}
                rating={review.rating}
                created_at={review.created_at}
                checked_out_date={review.checked_out_date}
                is_recommend={review.is_recommend}
                user={review.user}
              />
            ))}
          </div>
          <div className="flex justify-center w-full pt-4">
            <PaginationControl
              lastPage={lastPage}
              currentPage={page}
              setCurrentPage={setPage}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          <div className="text-xl italic">There's no review yet</div>
          <div className="text-lg font-semibold cursor-pointer hover:underline">
            Be the first one to explore and review this place
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingReviews;
