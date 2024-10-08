import { celebrate } from "@/utils/confetti/celebrate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";

export const BookingCompleted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-5xl">Congratulations!</h2>
        <p className="text-lg">You have successfully booked your trip!</p>
      </div>
      <div className="flex flex-col gap-5 w-[20%]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="bg-rose-500 py-3 mt-5 px-10 text-white text-base hover:bg-rose-600 font-medium rounded-lg cursor-pointer"
          onClick={() => navigate("/properties")}
        >
          Return to home page
        </motion.button>
        <MotionButton
          className="bg-white py-3 mt-5 px-5 w-full h-12 text-black border-2 border-black hover:bg-neutral-100 text-base font-medium rounded-lg cursor-pointer"
          onClick={() => navigate("/trips")}
        >
          View my trips
        </MotionButton>
      </div>
      {/* Confetti */}
    </div>
  );
};
