import { EmptyState } from "@/components/common/EmptyState";

export const PropertyList = () => {
  const isEmpty = true;
  if (isEmpty) {
    return <EmptyState showReset />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      My future listings
    </div>
  );
};
