import { Button } from "@/components/ui/button";
import MotionButton from "@/components/ui/MotionButton";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  sm?: boolean;
  clearAll?: () => void;
};

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
  sm,
  clearAll,
}: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) return;
    setIsModalOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) return;
    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto no-scrollbar outline-none focus:outline-none bg-neutral-800/70"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full md:w-4/5 lg:w-3/6 xl:w-[55%] mx-auto h-full md:h-auto lg:h-auto",
            { "xl:w-2/5": sm }
          )}
        >
          {/* CONTENT */}
          <div
            className={cn(
              "translate duration-300 h-full translate-y-full opacity-0",
              { "translate-y-0 opacity-100": isModalOpen }
            )}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="relative p-6 rounded-t border-b-2 flex justify-center items-center">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 rounded-full hover:bg-neutral-200 transition absolute left-6"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-bold">{title}</div>
                {clearAll && (
                  <Button
                    onClick={clearAll}
                    variant="ghost"
                    className="absolute right-6 py-1 px-4"
                  >
                    Clear options
                  </Button>
                )}
              </div>
              {/* BODY */}
              <div className="relative pt-4 px-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="w-full gap-4 flex items-center">
                  {secondaryAction && secondaryLabel && (
                    <MotionButton
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                      variant="airbnbOutline"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {secondaryLabel}
                    </MotionButton>
                  )}
                  <MotionButton
                    onClick={handleSubmit}
                    disabled={disabled}
                    variant="airbnb"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn({
                      "opacity-50 hover:opacity-50 cursor-not-allowed":
                        disabled,
                    })}
                  >
                    {actionLabel}
                  </MotionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
