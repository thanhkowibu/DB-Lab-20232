import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "http://localhost:8080/api/v1/auth/login";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email phải lớn hơn hai kí tự" })
    .max(50)
    .email("Hãy nhập địa chỉ email hợp lệ"),
  password: z.string().min(8, {
    message: "Password phải có ít nhất 8 kí tự",
  }),
});

export const LoginForm = () => {
  const { setAuth } = useAuth();
  // const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(values),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.flag === false) {
        throw new Error(response.data.message);
      }

      const authObject = {
        accessToken: response.data.data.access_token,
        user: response.data.data.user_info,
      };

      setAuth(authObject);
      localStorage.setItem(
        "auth",
        JSON.stringify(authObject)
      );

      // navigate(from, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="px-5 py-4 h-screen flex flex-col items-center justify-center bg-foreground">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 border px-20 rounded-xl py-12 bg-white w-full md:w-fit h-fit space-y-6 text-muted-foreground"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="w-80"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
