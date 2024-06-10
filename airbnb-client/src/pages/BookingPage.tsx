import { Container } from "@/components/common/Container";
import { useLocation } from "react-router-dom";

type Props = {};

const BookingPage: React.FC<Props> = ({}) => {
  const location = useLocation();

  const { totalPrice, nightlyPrice, maxGuests, startDate, endDate, listingId } =
    location.state;
  return (
    <Container>
      <div className="max-w-[1150px] mx-auto pt-16 grid grid-cols-2 gap-6">
        <div className="col-span-1 flex flex-col gap-8">
          <div>{startDate.toString()}</div>
          <div>{endDate.toString()}</div>
          <div>{listingId}</div>
          <div>{maxGuests}</div>
        </div>
        <div className="col-span-1 flex flex-col gap-8">
          <div>{nightlyPrice}</div>
          <div>{totalPrice}</div>
        </div>
      </div>
    </Container>
  );
};

export default BookingPage;
