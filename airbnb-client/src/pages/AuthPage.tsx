import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuth";
import { LoginReqProps } from "@/types/users.types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const validation = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const AuthPage = () => {
  const { loginUser, logoutUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReqProps>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginReqProps) => {
    loginUser({ email: form.email, password: form.password });
  };

  const [isToggled, setIsToggled] = useState(false);

  // for animation delay
  const [isZIndexLowered, setIsZIndexLowered] = useState(false);
  useEffect(() => {
    let timeoutId: any;
    if (!isToggled) {
      timeoutId = setTimeout(() => {
        setIsZIndexLowered(true);
      }, 100);
    } else {
      setIsZIndexLowered(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isToggled]);

  const handleToggle = () => {
    setIsToggled((pv) => !pv);
  };

  return (
    // <section className="bg-gray-50 dark:bg-gray-900">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //           Sign in to your account
    //         </h1>
    //         <form
    //           className="space-y-4 md:space-y-6"
    //           onSubmit={handleSubmit(handleLogin)}
    //         >
    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Email
    //             </label>
    //             <input
    //               type="text"
    //               id="email"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="Email"
    //               {...register("email")}
    //             />
    //             {errors.email ? (
    //               <p className="text-red-500">{errors.email.message}</p>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="password"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Password
    //             </label>
    //             <input
    //               type="password"
    //               id="password"
    //               placeholder="••••••••"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               {...register("password")}
    //             />
    //             {errors.password ? (
    //               <p className="text-red-500">{errors.password.message}</p>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <a
    //               href="#"
    //               className="text-sm font-medium text-primary-600 hover:underline"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //           <button
    //             type="submit"
    //             className="w-full text-white bg-neutral-900 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Sign in
    //           </button>

    //           <button
    //             onClick={logoutUser}
    //             className="w-full text-white bg-neutral-900 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Log out
    //           </button>
    //           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //             Don't have an account yet?{" "}
    //             <a
    //               href="#"
    //               className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Sign up
    //             </a>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="bg-neutral-100 w-full h-screen flex flex-col items-center justify-center sm:p-4">
      <div className="bg-white relative w-full max-w-xs md:max-w-2xl lg:max-w-4xl min-h-[540px] rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden">
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
          <form className="px-12 h-full text-center flex flex-col justify-center items-center space-y-6">
            <h1 className="font-bold text-3xl">Welcome back,</h1>
            <input
              type="text"
              placeholder="Email"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              type="text"
              placeholder="Password"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            />
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
        <div
          className={cn(
            "absolute top-0 left-0 bg-white w-1/2 z-20 h-full transition-all duration-1000 ease-in-out",
            { "translate-x-full": isToggled }
          )}
        >
          <form className="px-12 h-full text-center flex flex-col justify-center items-center space-y-8">
            <h1 className="font-bold text-3xl">Time to feel like home,</h1>
            <input
              type="text"
              placeholder="Firstname"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            />
            <input
              type="text"
              placeholder="Lastname"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            />
            <input
              type="text"
              placeholder="Email"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            />
            <input
              type="text"
              placeholder="Password"
              className="py-2 px-4 w-full font-semibold rounded-lg border-b-2 border-neutral-200"
            />
            <Button
              type="submit"
              variant="airbnb"
              className="transition-transform duration-75 ease-in uppercase rounded-full w-2/3"
            >
              Sign up
            </Button>
          </form>
        </div>
        <div
          className={cn(
            "absolute top-0 left-1/2 w-1/2 h-full z-50 overflow-hidden transition-transform duration-1000 ease-in-out",
            { "-translate-x-full": isToggled }
          )}
        >
          <div
            className={cn(
              "bg-custom bg-no-repeat bg-cover relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-1000 ease-in-out",
              { "translate-x-1/2": isToggled },
              "darken-background"
            )}
          >
            <div
              className={cn(
                "absolute top-0 left-0 h-full w-1/2 px-10 flex flex-col justify-around items-center text-center -translate-x-[20%] transition-transform duration-1000 ease-in-out",
                { "translate-x-0": isToggled }
              )}
            >
              <div className="flex flex-col justify-center items-center mt-6">
                <h1 className="text-white text-4xl font-bold">One of us?</h1>
                <p className="text-xl text-white font-light leading-snug my-5">
                  If you already had an account,
                  <br />
                  just sign in. We've missed you!
                </p>
              </div>
              <Button
                onClick={handleToggle}
                variant="airbnb"
                className="uppercase tracking-wider rounded-full w-1/3 bg-transparent border-2 border-white hover:bg-white hover:text-black"
              >
                Sign In
              </Button>
            </div>
            <div
              className={cn(
                "absolute top-0 right-0 h-full w-1/2 px-10 flex flex-col justify-around items-center text-center translate-x-0 transition-transform duration-1000 ease-in-out",
                { "translate-x-[20%]": isToggled }
              )}
            >
              <div className="flex flex-col justify-center items-center mt-6">
                <h1 className="text-white text-4xl font-bold">New here?</h1>
                <p className="text-xl text-white font-light leading-snug my-5">
                  Sign up today and discover a<br />
                  great amount of new opportunities!
                </p>
              </div>
              <Button
                onClick={handleToggle}
                variant="airbnb"
                className="uppercase tracking-wider rounded-full w-1/3 bg-transparent border-2 border-white hover:bg-white hover:text-black"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
