import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "../Container";

const PropertyDetailSkeleton = () => {
  return (
    <Container>
      <div className="max-w-[1150px] mx-auto pb-48">
        <div className="flex flex-col gap-6">
          <div className="pt-4 flex justify-between items-center">
            <Skeleton className="w-96 h-10 rounded-full" />
          </div>
          <div className="relative grid grid-cols-2 gap-2 w-full rounded-2xl overflow-hidden">
            <div className="w-full h-[55vh]">
              <Skeleton className="size-full" />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-[55vh]">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((_, index) => (
                <div
                  key={`${Math.random()}-${index}`}
                  className="w-full h-full"
                >
                  <Skeleton className="size-full" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
              <div className="col-span-4 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <Skeleton className="w-96 h-8 rounded-full" />

                  <div className="flex items-center gap-4 text-lg">
                    <Skeleton className="w-36 h-6 rounded-full" />
                    <Skeleton className="w-36 h-6 rounded-full" />
                    <Skeleton className="w-36 h-6 rounded-full" />
                    <Skeleton className="w-36 h-6 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default PropertyDetailSkeleton;
