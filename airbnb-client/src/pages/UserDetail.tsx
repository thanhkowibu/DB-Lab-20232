import { getUserDetail } from "@/action/getUserDetail";
import { Container } from "@/components/common/Container";
import UserTopListings from "@/components/common/listings/UserTopListings";
import { PropertyOverviewProps } from "@/types/properties.types";
import { UserDetailProps, UserProps } from "@/types/users.types";
import { getHostingTime } from "@/utils/hostingTime";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { EmblaOptionsType } from "embla-carousel";
import { useAuth } from "@/context/useAuth";
import UpdateAvatar from "@/components/common/inputs/UpdateAvatar";
import { AvatarLarge } from "@/components/common/AvatarLarge";
import UpdateModal from "@/components/common/inputs/UpdateModal";
import userApi from "@/api/modules/user.api";
import ReportModal from "@/components/common/inputs/ReportModal";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };

export const UserDetail = () => {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [topProperties, setTopProperties] = useState<
    PropertyOverviewProps[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const navigate = useNavigate();
  const userId = useLocation().pathname.split("/")[2];

  const { user, updateUser } = useAuth();

  const isUserAccount = user && user.id === Number(userId);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchData = async () => {
      try {
        const { data }: { data: UserDetailProps } = await getUserDetail(
          Number(userId)
        );
        if (isUserAccount) {
          setUserInfo(user);
        } else {
          if (data.user_info) setUserInfo(data.user_info);
        }
        if (data.top_properties) setTopProperties(data.top_properties);
      } catch (err: any) {
        if (err) {
          toast.error(err.message);
          if (err.code === 404) navigate("/404");
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, isUserAccount, user]);

  const handleOpen = async () => {
    try {
      const { data } = (await userApi.getDetails(Number(userId))) as {
        data: UserProps;
      };
      if (data) {
        const updatedUser: any = {
          ...user,
          roles: data.roles,
          phone_number: data.phone_number,
          gender: data.gender,
          dob: data.dob,
        };
        updateUser(updatedUser);
      }
      setIsOpen(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleReportOpen = () => {
    setIsReportOpen(true);
  };

  return (
    <Container>
      <div className="max-w-[1150px] mx-auto pt-16 grid grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col gap-8">
          <div className="w-full px-12 py-4 flex flex-col items-center gap-6 rounded-2xl shadow-neutral-300 shadow-lg">
            <div className="relative w-full aspect-square">
              {isUserAccount && <UpdateAvatar userId={Number(userId)} />}
              <AvatarLarge path={userInfo?.avatar?.path} size="100%" />
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="text-3xl font-bold">
                {userInfo?.firstname} {userInfo?.lastname}
              </div>
              <div className=" text-neutral-600">{userInfo?.email}</div>
            </div>
            <div className="text-lg font-semibold text-neutral-700">
              {userInfo && getHostingTime(userInfo?.created_at)}
            </div>
          </div>
          {isUserAccount ? (
            <div className="flex justify-center px-6 gap-4 w-full">
              <button
                onClick={handleOpen}
                className="font-semibold text-sm w-36 rounded-lg py-2 border-2 border-neutral-700 hover:bg-neutral-100"
              >
                Edit your profile
              </button>
              <UpdateModal
                userId={Number(userId)}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          ) : (
            <>
              <div
                onClick={handleReportOpen}
                className="flex items-center px-6 gap-4 cursor-pointer"
              >
                <FaFlag />
                <div className="text-lg font-semibold underline">
                  Report this user
                </div>
              </div>
              <ReportModal
                userId={Number(userId)}
                isOpen={isReportOpen}
                setIsOpen={setIsReportOpen}
              />
            </>
          )}
        </div>
        <div className=" col-span-2 h-20 flex flex-col gap-6">
          <div className="flex flex-col gap-8 pl-24 w-full">
            <div className="flex justify-between w-full px-2">
              <div className="text-3xl font-semibold">
                {userInfo?.lastname}'s top listings
              </div>
              <button
                onClick={() => navigate(`/users/${userId}/properties`)}
                className="font-semibold rounded-xl text-sm px-6 border-[1px] border-neutral-700 hover:bg-neutral-100"
              >
                See all
              </button>
            </div>

            <UserTopListings topProperties={topProperties} options={OPTIONS} />
          </div>
        </div>
      </div>
    </Container>
  );
};
