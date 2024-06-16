import { ImageProps } from "@/types/global.types";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../carousel/CarouselDot";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../carousel/CarouselBtn";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  imageSrc: ImageProps[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialIndex: number;
};

const ImageCarousel: React.FC<Props> = ({
  imageSrc,
  isOpen,
  setIsOpen,
  initialIndex,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex, // Set the startIndex based on prop
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto no-scrollbar outline-none focus:outline-none bg-neutral-900/80 no-scrollbar"
        >
          <section className="size-full">
            <div className="size-full flex" ref={emblaRef}>
              <div className="size-full flex">
                {imageSrc.map((slide, index) => (
                  <div
                    className="flex justify-center items-center w-full min-w-[100vw]"
                    key={index}
                  >
                    <motion.img
                      initial={{ scale: 0.7, opacity: 0.5 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 27,
                        },
                      }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      src={slide ? slide.path : undefined}
                      className="max-h-[85vh] max-w-[80vw] select-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="embla__controls">
              <div
                className={cn("embla__buttons", {
                  "flex-row-reverse": selectedIndex === 0,
                })}
              >
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                  slideIndex={selectedIndex}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                  slideIndex={selectedIndex}
                  totalSlides={imageSrc.length - 1}
                />
              </div>
              <div className="embla__dots absolute bottom-2 w-full">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => {
                      onDotButtonClick(index);
                    }}
                    className={"embla__dot".concat(
                      index === selectedIndex ? " embla__dot--selected" : ""
                    )}
                  />
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageCarousel;
