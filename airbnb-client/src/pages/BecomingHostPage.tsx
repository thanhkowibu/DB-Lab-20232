import HostStartForm from "@/components/common/host-request/HostStartForm";
import { MapCom } from "@/components/common/host-request/MapCom";
import PageBanner from "@/components/common/host-request/PageBanner";
import RevenueEstimate from "@/components/common/host-request/RevenueEstimate";

const BecomingHostPage = () => {
  return (
    <div className="my-16 mx-12">
      <div className="flex justify-between px-12 ">
        <RevenueEstimate />
        <MapCom />
      </div>
      <PageBanner />
      <HostStartForm />
    </div>
  );
};
export default BecomingHostPage;
