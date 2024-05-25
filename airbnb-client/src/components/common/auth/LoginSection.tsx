import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuth";
import { LoginReqProps } from "@/types/users.types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const validation = Yup.object().shape({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

export const LoginSection = ({
  isToggled,
  isZIndexLowered,
}: {
  isToggled: boolean;
  isZIndexLowered: boolean;
}) => {
  const { loginUser } = useAuth();
  const [err, setErr] = useState("");

  const handleLogin = async (form: LoginReqProps) => {
    try {
      await loginUser({ email: form.email, password: form.password });
    } catch (err: any) {
      if (err.data) {
        if (err.code === 401) setErr(err.message);
        else setErr(err.data.email || err.data.password);
      } else {
        setErr(err.message);
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReqProps>({ resolver: yupResolver(validation) });

  return (
    <div
      className={cn(
        "absolute top-0 left-0 bg-white w-1/2 h-full transition-all duration-1000 ease-in-out",
        {
          "translate-x-full z-10 fade-out-delay": isToggled,
          "z-50": isZIndexLowered,
          "z-10": !isZIndexLowered,
        }
      )}
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-12 h-full text-center flex flex-col justify-center items-center space-y-6"
      >
        <h1 className="font-bold text-3xl">Welcome back,</h1>
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
          {err && <p className="text-red-500 mt-4 ml-2">{err}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Button variant="link">Forgot password?</Button>
        </div>
        <Button
          type="submit"
          variant="airbnb"
          className="transition-transform duration-75 ease-in uppercase rounded-full w-2/3"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};
