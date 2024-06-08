import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  title: string;
  subtitle: string;
  sortColumn: string;
  sortDirection: string;
  onChangeSortColumn: (value: string) => void;
  onChangeSortDirection: (value: string) => void;
};

const SortingOptions: React.FC<Props> = ({
  title,
  subtitle,
  sortColumn,
  sortDirection,
  onChangeSortColumn,
  onChangeSortDirection,
}) => {
  const handleSortColumnChange = (value: string) => {
    onChangeSortColumn(value);
  };

  const handleSortDirectionChange = (value: string) => {
    onChangeSortDirection(value);
  };

  return (
    <div className="flex flex-col gap-1 justify-between">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-gray-600">{subtitle}</div>
      <div className="mt-4 mb-6 mx-4 flex justify-between gap-8">
        <div className="w-full flex flex-col gap-2">
          <div className="font-semibold mx-4">Sorted by</div>
          <Select value={sortColumn} onValueChange={handleSortColumnChange}>
            <SelectTrigger>
              <SelectValue placeholder="Updated at" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorted by</SelectLabel>
                <SelectItem value="updatedAt">Updated at</SelectItem>
                <SelectItem value="averageRating">Averate rating</SelectItem>
                <SelectItem value="nightlyPrice">Nightly price</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="font-semibold mx-4">Sort direction</div>
          <Select
            value={sortDirection}
            onValueChange={handleSortDirectionChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ascending" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort direction</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SortingOptions;
