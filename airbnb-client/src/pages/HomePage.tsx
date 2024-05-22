import authApi from "@/api/modules/auth.api";
import { Image } from "@/components/common/Image";
import { ResultProps } from "@/types/global.types";
import { LoginInfoProps } from "@/types/users.types";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [s, setS] = useState<LoginInfoProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: ResultProps = await authApi.login({
          email: "user2@gmail.com",
          password: "12345678",
        });
        const { data }: { data: LoginInfoProps } = res;
        console.log(data.access_token);
        setS(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      HomePage
      <Image path={s?.user_info.avatar?.path} />
    </div>
  );
};
