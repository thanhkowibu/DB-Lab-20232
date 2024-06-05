import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import { Button } from "@/components/ui/button";
type Props = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

const ListingReservation: React.FC<Props> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-2 border-neutral-200 overflow-hidden sticky top-24 shadow-md">
      <div className="flex items-end gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {Number(price).toFixed(1)}
        </div>
        <div className="text-neutral-600">/night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} onClick={onSubmit} variant="airbnb">
          Reserve
        </Button>
      </div>
      <div className="pb-4 px-6 flex items-center justify-between font-semibold text-lg">
        <div>Total : </div>
        <div>$ {Number(totalPrice).toFixed(1)}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
