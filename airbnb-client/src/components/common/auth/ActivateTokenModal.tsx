import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AuthCode from "react-auth-code-input";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import toast from "react-hot-toast";

export const ActivateTokenModal = ({
  isOpen,
  handleCloseModal,
  account,
}: {
  isOpen: boolean;
  handleCloseModal: () => void;
  account: {
    email: string;
    password: string;
  };
}) => {
  const divref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { activate, resendToken, loginUser } = useAuth();

  const [otp, setOtp] = useState("");
  const handleOnChange = (res: string) => {
    setOtp(res);
  };

  useOnClickOutside(divref, handleCloseModal);

  const censorEmail = (email: string) => {
    const emailParts = email.split("@");
    if (emailParts.length !== 2) {
      return email;
    }

    const [emailName, emailDomain] = emailParts;
    const censoredEmailName =
      emailName.length > 2
        ? emailName[0] +
          "*".repeat(emailName.length - 2) +
          emailName[emailName.length - 1]
        : emailName;

    return `${censoredEmailName}@${emailDomain}`;
  };

  const handleSubmit = async () => {
    // console.log(otp);
    try {
      const res = await activate(otp);
      if (res) {
        if (res.code === 202)
          toast.error("The OTP code has expired. Please check your mail again");
        else {
          toast.success(res.data);
          handleCloseModal();
          await loginUser({ email: account.email, password: account.password });
          navigate("/");
          toast.success("Logged in successfully");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleResend = async () => {
    const res = await resendToken(account.email);
    if (res) {
      // console.log(res);
      toast.success("Token resent");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-[1px] grid place-items-center"
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{
              y: 0,
              transition: { ease: "easeInOut", duration: 0.35 },
            }}
            exit={{ y: 50 }}
            className="bg-white rounded-3xl flex flex-col items-center justify-center"
            ref={divref}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="relative p-4 rounded-t border-b-2 flex justify-center items-center">
                <button
                  onClick={handleCloseModal}
                  className="p-1 border-0 rounded-full hover:bg-neutral-200 transition absolute right-4"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-2xl font-semibold">Account activation</div>
              </div>
              {/* BODY */}
              <div className="relative px-6 py-4 flex-auto flex flex-col items-center justify-between">
                {/* <div>We've sent you the OTP code via your email</div> */}
                <div className="font-semibold text-center text-neutral-600 text-lg mb-4">
                  The verification code has been sent to your email
                  <br />
                  {censorEmail(account.email)} Enter the code to activate your
                  account.
                </div>
                <div className="min-w-fit flex">
                  <AuthCode
                    onChange={handleOnChange}
                    inputClassName="size-16 border-2 border-neutral-400 rounded-xl mx-2 my-2 text-center text-xl font-semibold align-middle"
                  />
                </div>
                <div className="mt-6 text-neutral-800">
                  Didn't received your mail? Click{" "}
                  <span
                    onClick={handleResend}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    here
                  </span>{" "}
                  to resend
                </div>
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 px-6 pb-4">
                <div className="w-full gap-4 flex flex-col items-center">
                  <Button onClick={handleSubmit} variant="airbnb">
                    Activate
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
