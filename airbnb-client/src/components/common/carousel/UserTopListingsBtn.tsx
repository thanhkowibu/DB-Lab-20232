import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: (e: any) => void;
  onNextButtonClick: (e: any) => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!emblaApi) return;
      emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const onNextButtonClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!emblaApi) return;
      emblaApi.scrollNext();
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi
      .on("reInit", () => onSelect(emblaApi))
      .on("select", () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type ButtonProps = {
  slideIndex: number;
  totalSlides?: number;
  white?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const PrevButton: React.FC<ButtonProps> = (props) => {
  const { children, slideIndex, ...restProps } = props;

  return (
    <button
      className={cn(
        "size-8 rounded-full flex items-center justify-center bg-white text-black border-2 border-neutral-300 cursor-pointer shadow-inner hover:border-neutral-400 transition duration-300",
        {
          "cursor-not-allowed opacity-40": slideIndex === 0,
        }
      )}
      type="button"
      {...restProps}
    >
      <IoIosArrowBack />
      {children}
    </button>
  );
};

export const NextButton: React.FC<ButtonProps> = (props) => {
  const { children, slideIndex, totalSlides, ...restProps } = props;

  return (
    <button
      className={cn(
        "size-8 rounded-full flex items-center justify-center bg-white text-black border-2 border-neutral-300 cursor-pointer shadow-inner hover:border-neutral-400 transition duration-300",
        {
          "cursor-not-allowed opacity-40": slideIndex === totalSlides,
        }
      )}
      type="button"
      {...restProps}
    >
      <IoIosArrowForward />
      {children}
    </button>
  );
};
