import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

type MotionButtonProps = ButtonProps & {
  whileHover?: object;
  whileTap?: object;
  initial?: object;
  animate?: object;
  exit?: object;
};

const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.9 },
  initial,
  animate,
  exit,
  ...props
}) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      exit={exit}
      className="size-full"
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
};

export default MotionButton;
