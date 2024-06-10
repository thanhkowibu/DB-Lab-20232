import toast from "react-hot-toast";
import { Modal } from "../navbar/modals/Modal";
import userApi from "@/api/modules/user.api";
import { useAuth } from "@/context/useAuth";
import { Heading } from "../Heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  phone_number: yup.string(),
  gender: yup.string(),
  dob: yup.string().nullable(), // Match FormData and allow null
});

type Props = {
  userId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  firstname?: string;
  lastname?: string;
  phone_number?: string;
  gender?: string;
  dob?: string; // Keep dob as string for simplicity
};

const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  let dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const UpdateModal: React.FC<Props> = ({ userId, isOpen, setIsOpen }) => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      phone_number: user?.phone_number,
      dob: user?.dob ? formatDate(user.dob) : undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        firstname: user?.firstname,
        lastname: user?.lastname,
        phone_number: user?.phone_number,
        gender: user?.gender,
        dob: user?.dob ? formatDate(user.dob) : undefined,
      });
    }
  }, [isOpen, reset, user]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    console.log(data.gender, user?.gender);
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => {
          // If the key is 'gender' and it's not present, filter it out
          if (key === "gender" && !value) {
            return false;
          }
          // Otherwise, filter out all keys with null values
          return value != null;
        })
      );

      const res = await userApi.updateInfo(userId, {
        ...filteredData,
        dob: data.dob ? new Date(filteredData.dob) : undefined,
      });

      if (res) {
        toast.success("Profile updated");
        const updatedUser: any = { ...user, ...data };
        updateUser(updatedUser);
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeGender = (value: string) => {
    setValue("gender", value);
  };

  const bodyContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 h-full w-full px-2 overflow-y-scroll no-scrollbar"
      name="update"
    >
      <div className="flex justify-between gap-12">
        <div className="flex flex-col flex-1">
          <Heading title="Firstname" />
          <input
            {...register("firstname")}
            placeholder="E.g: Misono"
            id="firstname"
            type="text"
            autoComplete="name"
            className="border border-gray-300 p-4 rounded-lg w-full text-lg"
          />
        </div>
        <div className="flex flex-col flex-1">
          <Heading title="Lastname" />
          <input
            {...register("lastname")}
            placeholder="E.g: Mika"
            id="lastname"
            type="text"
            autoComplete="name"
            className="border border-gray-300 p-4 rounded-lg w-full text-lg"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Heading title="Phone number" />
        <input
          {...register("phone_number")}
          placeholder="E.g: 09xx6xx9xx"
          id="phone"
          type="text"
          autoComplete="phone"
          className="border border-gray-300 p-4 rounded-lg w-full text-lg"
        />
      </div>
      <div className="flex flex-col">
        <Heading title="Gender" />
        <Select defaultValue={user?.gender} onValueChange={handleChangeGender}>
          <SelectTrigger className="border border-gray-300 px-4 py-8 rounded-lg w-full text-lg text-gray-400">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Heading title="D.o.b" />
        <input
          {...register("dob")}
          placeholder="E.g: 2004-08-05"
          type="date"
          id="dob"
          autoComplete="dob"
          className="border border-gray-300 p-4 rounded-lg w-full text-lg"
        />
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit profile"
      actionLabel={isLoading ? "Updating..." : "Update"}
      secondaryLabel="Cancel"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default UpdateModal;
