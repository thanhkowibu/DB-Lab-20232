import { useNavigate } from "react-router-dom";
import { Heading } from "./Heading";
import MotionButton from "../ui/MotionButton";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some filters",
  showReset,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="h-[80vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <MotionButton
            onClick={() => navigate("/properties")}
            variant="airbnbOutline"
          >
            Remove all filters
          </MotionButton>
        )}
      </div>
    </div>
  );
};
