import { Container } from "@/components/common/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ManageListings from "@/components/common/hosting/ManageListings";
import ManageBookings from "@/components/common/hosting/ManageBookings";

type Props = {};

const HostingPage: React.FC<Props> = ({}) => {
  return (
    <Container>
      <div className="mx-auto pt-12 pb-16 flex flex-col gap-4">
        <div className="text-4xl font-bold">Hosting Dashboard</div>
        <hr />
        <div className="p-6">
          <div className="text-2xl font-semibold">
            Manage your hosted listings
          </div>
        </div>
        <div className="w-full">
          <ManageListings />
        </div>
        <hr />

        <div className="p-6">
          <div className="text-2xl font-semibold">
            Manage your bookings request
          </div>
        </div>
        <div className="w-full">
          <ManageBookings />
        </div>

        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="p-6">
                <div className="text-2xl font-semibold">
                  Manage your hosted listings
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ManageListings />
            </AccordionContent>
          </AccordionItem>
          <hr />
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="p-6">
                <div className="text-2xl font-semibold">
                  Manage your bookings request
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ManageBookings />
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </div>
    </Container>
  );
};

export default HostingPage;
