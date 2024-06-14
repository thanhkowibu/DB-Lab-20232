import { Container } from "@/components/common/Container";
import { IoIosArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const HostingPage: React.FC<Props> = ({}) => {
  return (
    <Container>
      <div className="mx-auto pt-12 pb-16 flex flex-col gap-4">
        <div className="text-4xl font-bold">Hosting Dashboard</div>
        <hr />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="p-6">
                <div className="text-xl font-semibold">
                  Manage your hosted listings
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div>listings</div>
            </AccordionContent>
          </AccordionItem>
          <hr />
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="p-6">
                <div className="text-xl font-semibold">
                  Manage your bookings request
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-lg flex flex-col gap-6">
              <div>bookings</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Container>
  );
};

export default HostingPage;
