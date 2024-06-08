import { getListings } from "@/action/getListings";
import { PropertyOverviewProps } from "@/types/properties.types";
import { delay } from "@/utils/delay";
import { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { ListingCard } from "./ListingCard";
import PropertyOverviewSkeleton from "../skeleton/PropertyOverviewSkeleton";
import { PAGE_SIZE } from "@/data/params";

type Props = { params: string; lastpage: number };

const LoadMore: React.FC<Props> = ({ params, lastpage }) => {
  const LIMIT = Math.min(lastpage, 10);

  const [state, setState] = useState({
    listings: [] as PropertyOverviewProps[],
    page: 1,
    loading: false,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadmoreListings = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    await delay(1000);
    const nextPage = state.page + 1;

    const newParams = params + `&page_size=${PAGE_SIZE}&page=${nextPage}`;
    console.log(newParams);
    try {
      const { properties } = await getListings(newParams);
      const newListings = properties ?? [];
      setState((prevState) => ({
        listings: [...prevState.listings, ...newListings],
        page: nextPage,
        loading: false,
      }));
    } catch (err: any) {
      toast.error(err.message);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [params, state.page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !state.loading && state.page < LIMIT) {
          loadmoreListings();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadmoreListings, state.loading, state.page, lastpage]);

  return (
    <>
      {state.listings.map((listing: PropertyOverviewProps) => (
        <ListingCard key={listing.id} data={listing} />
      ))}
      {state.page < LIMIT && (
        <div
          className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4"
          ref={loadMoreRef}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <PropertyOverviewSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LoadMore;
