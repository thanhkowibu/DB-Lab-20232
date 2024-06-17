import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

export const HostedPropertyItemSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4 w-full border-b-2 pb-6 px-2">
    <div className="flex justify-between">
      <div className="flex items-center gap-4 w-full">
        <div className="w-14 h-14 rounded-xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-[0.25rem] justify-center w-full">
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-1/5 h-4 mt-1" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="w-24 h-8" />
      </div>
    </div>
  </div>
);
