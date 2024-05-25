import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuth";
import { RegisterReqProps } from "@/types/users.types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "../navbar/modals/Modal";

const validation = Yup.object().shape({
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

export const RegisterSection = ({ isToggled }: { isToggled: boolean }) => {
  const { registerUser } = useAuth();

  const handleRegister = (form: RegisterReqProps) => {
    registerUser({
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterReqProps>({ resolver: yupResolver(validation) });
  return (
    <div
      className={cn(
        "absolute top-0 left-0 bg-white w-1/2 z-20 h-full transition-all duration-1000 ease-in-out",
        { "translate-x-full": isToggled }
      )}
    >
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="px-12 h-full text-center flex flex-col justify-center items-center space-y-8"
      >
        <h1 className="font-bold text-3xl">Time to feel like home,</h1>
        <div className="flex gap-4">
          <div className="flex flex-col items-start">
            <input
              type="text"
              placeholder="Firstname"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-red-500 ml-4">{errors.firstname.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <input
              type="text"
              placeholder="Lastname"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-red-500 ml-4">{errors.lastname.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-start">
          <input
            type="text"
            placeholder="Email"
            className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 ml-4">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start">
          <input
            type="password"
            placeholder="Password"
            className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 ml-4">{errors.password.message}</p>
          )}
        </div>
        {true && (
          <p className="text-blue-500 w-full text-start ml-4">
            Check email and activate your account{" "}
            <span className="underline font-semibold cursor-pointer">here</span>
          </p>
        )}
        <Button
          type="submit"
          variant="airbnb"
          className="transition-transform duration-75 ease-in uppercase rounded-full w-2/3"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};
