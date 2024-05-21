import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
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
    secondaryAction;
  };
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/5 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={cn(
              "translate duration-300 h-full translate-y-full opacity-0",
              { "translate-y-0 opacity-100": isModalOpen }
            )}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="relative p-6 rounded-t border-b-2 flex justify-center items-center">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 rounded-full hover:bg-neutral-200 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="w-full gap-4 flex flex-col items-center">
                  <Button variant="airbnb">Ligma ball</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
