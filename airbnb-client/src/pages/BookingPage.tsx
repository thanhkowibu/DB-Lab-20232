import { Container } from "@/components/common/Container";
import { Image } from "@/components/common/image/Image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { IoIosArrowBack } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Counter from "@/components/common/inputs/Counter";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import bookingApi from "@/api/modules/booking.api";
import { BookingCompleted } from "@/components/common/booking/BookingCompleted";
import { cn } from "@/lib/utils";

type Props = {};

const BookingPage: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pet, setPet] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [cleanFee, setCleanFee] = useState(true);
  const [serviceFee, setServiceFee] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    totalPrice,
    nightlyPrice,
    maxGuests,
    startDate,
    endDate,
    listingId,
    longTitle,
    address,
    listingImg,
    rating,
    reviewCount,
  } = location.state;

  const formattedStartDate = format(new Date(startDate), "MMM dd");
  const formattedEndDate = format(new Date(endDate), "MMM dd");

  useEffect(() => {
    setTotalGuests(adults + children + pet);
  }, [adults, children, pet]);

  const handleBooking = async () => {
    setIsLoading(true);

    const input = {
      check_in_date: startDate,
      check_out_date: endDate,
      num_alduts: adults,
      num_childrens: children,
      num_pets: pet,
      nightly_fee: totalPrice,
      clean_fee: 10 * Number(cleanFee),
      service_fee: 20 * Number(serviceFee),
    };
    // console.log(input);
    try {
      const res = await bookingApi.create(listingId, input);
      if (res.code === 200) {
        toast.success("Booking succesfully");
        setIsCompleted(true);
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      {isCompleted ? (
        <div className="absolute inset-0 z-5 bg-white no-scrollbar">
          <BookingCompleted />
        </div>
      ) : (
        <div className="max-w-[1150px] mx-auto pt-12 pb-32 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-neutral-100 rounded-full p-3 mt-1"
            >
              <IoIosArrowBack size={16} />
            </button>
            <div className="text-4xl font-semibold">Request to book</div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1 flex flex-col gap-20">
              <div className="flex flex-col gap-8">
                <div className="text-3xl font-semibold">Your trip</div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex flex-col gap-2 text-start">
                        <div className="font-semibold text-xl">Dates</div>
                        <div className="text-lg font-normal">{`${formattedStartDate} - ${formattedEndDate}`}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-lg">
                        Your checkin day is {formattedStartDate}. Your checkout
                        day is {formattedEndDate}.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      {" "}
                      <div className="flex flex-col gap-2 text-start">
                        <div className="font-semibold text-xl">
                          Guests
                          <span className="font-normal text-base">
                            {" "}
                            (max guests allowed: {maxGuests})
                          </span>
                        </div>
                        <div className="text-lg font-normal">
                          {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-lg flex flex-col gap-6">
                      <Counter
                        title="Adults"
                        subtitle="How many adults are coming?"
                        value={adults}
                        onChange={(value) => setAdults(value)}
                        maxReached={totalGuests >= maxGuests}
                      />
                      <Counter
                        title="Children"
                        subtitle="How many children are coming?"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        zero_allowed
                        maxReached={totalGuests >= maxGuests}
                      />
                      <Counter
                        title="Pets"
                        subtitle="How many pets are you bringing?"
                        value={pet}
                        onChange={(value) => setPet(value)}
                        zero_allowed
                        maxReached={totalGuests >= maxGuests}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <hr />
                <div className="text-3xl font-semibold">Additional fee</div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-xl">Cleaning fee</div>
                    <div className="text-lg">$ 10</div>
                  </div>
                  <Checkbox
                    id="cleanFee"
                    checked={cleanFee}
                    onCheckedChange={() => setCleanFee((prev) => !prev)}
                    className="size-6"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-xl">Service fee</div>
                    <div className="text-lg">$ 20</div>
                  </div>
                  <Checkbox
                    id="serviceFee"
                    checked={serviceFee}
                    onCheckedChange={() => setServiceFee((prev) => !prev)}
                    className="size-6"
                  />
                </div>
                <hr />
                <div className="text-3xl font-semibold">
                  Cancellation policy
                </div>
                <div className="text-lg">
                  <b>Free cancellation before {formattedStartDate}.</b> Cancel
                  before check-in on {formattedEndDate} for a partial refund.{" "}
                  <span className="font-semibold underline cursor-pointer">
                    Learn more
                  </span>
                </div>
                <hr />
                <div className="text-3xl font-semibold">Ground rules</div>
                <div className="flex flex-col gap-2">
                  <div className="text-lg">
                    We ask every guest to remember a few simple things about
                    what makes a great guest.
                  </div>
                </div>
                <ul className="flex flex-col gap-2 text-lg list-disc mx-4">
                  <li>Follow the house rules</li>
                  <li>Treat your Host’s home like your own</li>
                </ul>
                <hr />
                <div className="flex justify-between w-full">
                  <div className="size-24 flex items-center">
                    <LuCalendarClock size={42} />
                  </div>
                  <div className="text-lg flex items-center">
                    <div>
                      <span className="font-semibold">
                        Your reservation won’t be confirmed until the Host
                        accepts your request (within 24 hours).
                      </span>{" "}
                      You won’t be charged until then.
                    </div>
                  </div>
                </div>
                <hr />

                <div className="text-sm">
                  By selecting the button below, I agree to the{" "}
                  <span className="underline font-semibold">
                    Host's House Rules, Ground rules for guests, Mikabnb's
                    Rebooking and Refund Policy,
                  </span>{" "}
                  and that Mikabnb can{" "}
                  <span className="underline font-semibold">
                    charge my payment method
                  </span>{" "}
                  if I’m responsible for damage. I agree to pay the total amount
                  shown if the Host accepts my booking request.
                </div>
                <Button
                  onClick={handleBooking}
                  variant="airbnb"
                  size="lg"
                  className={cn("rounded-xl", {
                    "opacity-50 hover:opacity-50 cursor-not-allowed": isLoading,
                  })}
                  disabled={isLoading}
                >
                  Request to book
                </Button>
              </div>
            </div>

            <div className="col-span-1">
              <div className="sticky top-44 flex flex-col gap-4 mx-8 px-6 py-8 border-[1px] border-neutral-300 rounded-xl">
                <div className="flex gap-4">
                  <div className="size-28 rounded-2xl bg-red-200 overflow-hidden">
                    <Image path={listingImg} />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="font-semibold text-lg">{longTitle}</div>
                    <div className="">{address}</div>
                    <div className="">
                      <span className="font-semibold">★{rating}</span> (
                      {reviewCount} review)
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <hr />

                  <div className="text-3xl font-semibold">Price details</div>
                  <div className="flex flex-col gap-4 text-lg">
                    <div className="flex justify-between">
                      <div>
                        ${nightlyPrice} x {totalPrice / nightlyPrice} night
                        {totalPrice / nightlyPrice !== 1 && "s"}
                      </div>
                      <div>${Number(totalPrice).toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="underline">Additional fee</div>
                      <div>
                        $
                        {Number(
                          Number(cleanFee) * 10 + Number(serviceFee) * 20
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="flex justify-between font-semibold text-xl">
                    <div className="underline">Total (USD)</div>
                    <div>
                      $
                      {Number(
                        totalPrice +
                          Number(cleanFee) * 10 +
                          Number(serviceFee) * 20
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default BookingPage;
