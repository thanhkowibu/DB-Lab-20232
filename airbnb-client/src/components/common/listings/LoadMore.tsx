import { getListings } from "@/action/getListings";
import { PropertyOverviewProps } from "@/types/properties.types";
import { delay } from "@/utils/delay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { ListingCard } from "./ListingCard";
import PropertyOverviewSkeleton from "../skeleton/PropertyOverviewSkeleton";
import { PAGE_SIZE } from "@/data/params";

type Props = { params: string; lastpage: number };

const LoadMore: React.FC<Props> = ({ params, lastpage }) => {
  const [state, setState] = useState({
    listings: [] as PropertyOverviewProps[],
    page: 1,
    loading: false,
  });

  const { ref, inView } = useInView();

  const loadmoreListings = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    await delay(1000);
    const nextPage = state.page + 1;

    const newParams = params + `&page_size=${PAGE_SIZE / 2}&page=${nextPage}`;
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
  };

  useEffect(() => {
    if (inView && !state.loading && state.page < lastpage) {
      loadmoreListings();
    }
  }, [inView, state.loading]);

  return (
    <>
      {state.listings?.map((listing: PropertyOverviewProps) => (
        // <ListingCard key={`${Math.random()}-${listing.id}`} data={listing} />
        <ListingCard key={listing.id} data={listing} />
      ))}
      {state.page < lastpage && (
        <div
          className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4"
          ref={ref}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((_, index) => (
              <PropertyOverviewSkeleton key={Math.random() + index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LoadMore;
