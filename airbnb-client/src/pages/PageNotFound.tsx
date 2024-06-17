import { Button } from "@/components/ui/button";
import { MdSearchOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {};

const PageNotFound: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-8">
      <div className="text-7xl font-bold text-neutral-600">Page not found!</div>
      <div>
        <MdSearchOff size={190} fill="gray" />
      </div>
      <div className="text-2xl to-neutral-600">
        We can't seem to find the page you're looking for.
      </div>
      <div className="w-48">
        <Button
          onClick={() => navigate("/properties")}
          variant="airbnbOutline"
          className=" rounded-2xl p-8"
        >
          Return to homepage
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
