import { Skeleton } from "@/components/ui/skeleton";

const ReviewItemSkeleton: React.FC = () => (
  <div className="flex flex-col gap-2 h-52 rounded-xl">
    <div className="flex items-center gap-6 justify-between w-fit rounded-xl py-2">
      <Skeleton className="w-14 h-14 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-36 h-6" />
        <Skeleton className="w-24 h-4" />
      </div>
    </div>

    <div className="flex items-center justify-between w-full pr-2">
      <Skeleton className="w-24 h-6" />
      <Skeleton className="w-32 h-6" />
    </div>

    <div className="flex flex-col gap-4 items-start">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-24 h-6" />
    </div>
  </div>
);

export default ReviewItemSkeleton;
