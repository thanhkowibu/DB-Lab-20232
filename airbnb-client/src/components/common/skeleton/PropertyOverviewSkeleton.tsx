import { Skeleton } from "@/components/ui/skeleton";

const PropertyOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-[95%]">
      <Skeleton className="aspect-square w-full relative overflow-hidden rounded-xl"></Skeleton>
      <div className="flex flex-col w-full h-24">
        <div className="w-full flex items-center justify-between h-5">
          <Skeleton className="w-40 h-full"></Skeleton>
          <Skeleton className="mr-1 w-16 h-full"></Skeleton>
        </div>
        <div className="flex flex-col mt-2">
          <Skeleton className="w-36 h-4"></Skeleton>
          <Skeleton className="w-28 h-4 mt-1"></Skeleton>
        </div>
      </div>
    </div>
  );
};
export default PropertyOverviewSkeleton;
