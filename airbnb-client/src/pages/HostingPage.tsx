import { Container } from "@/components/common/Container";
import ManageListings from "@/components/common/hosting/ManageListings";
import ManageBookings from "@/components/common/hosting/ManageBookings";

type Props = {};

const HostingPage: React.FC<Props> = ({}) => {
  return (
    <Container>
      <div className="mx-auto pt-12 pb-16 flex flex-col gap-4">
        <div className="text-4xl font-bold">Hosting Dashboard</div>
        <hr />
        <div className="md:p-6">
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
      </div>
    </Container>
  );
};

export default HostingPage;
