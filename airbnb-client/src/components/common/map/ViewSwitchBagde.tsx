import { BsFillMapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {
  isMapView: boolean;
  setIsMapView: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewSwitchBagde: React.FC<Props> = ({ isMapView, setIsMapView }) => {
  return (
    <div className="fixed z-10 flex justify-center items-center bottom-12 left-0 right-0">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMapView((pv) => !pv)}
        className="bg-black px-4 py-4 text-white rounded-full cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          {!isMapView ? (
            <>
              Show Map <BsFillMapFill />
            </>
          ) : (
            <>
              Show List <FaListUl />
            </>
          )}
        </span>
      </motion.div>
    </div>
  );
};

export default ViewSwitchBagde;
