import privateClient from "@/api/client/private.client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HostStartForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const alreadyHost = user?.roles?.includes("host");

  const handleRequestToBecomeHost = async () => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await privateClient.post("/users/host-request");
      if (res.flag === false) {
        throw new Error(res.message);
      } else {
        toast.success("Your request to become host has been sent.");

        navigate("/properties");
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (alreadyHost) return null;

  return (
    <div className="pb-48 flex items-center justify-center">
      <Button
        className="w-1/3 h-[160px] rounded-full text-3xl"
        variant={"airbnbOutline"}
        onClick={handleRequestToBecomeHost}
        disabled={isLoading}
      >
        Becoming A Host Now!
      </Button>
    </div>
  );
};
export default HostStartForm;
