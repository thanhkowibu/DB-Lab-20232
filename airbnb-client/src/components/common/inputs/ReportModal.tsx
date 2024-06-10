import { useState } from "react";
import { Heading } from "../Heading";
import { Modal } from "../navbar/modals/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportIssue } from "@/types/users.types";
import toast from "react-hot-toast";
import userApi from "@/api/modules/user.api";

type Props = {
  userId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportModal: React.FC<Props> = ({ userId, isOpen, setIsOpen }) => {
  const [detail, setDetail] = useState("");
  const [issue, setIssue] = useState("");

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    const input = {
      detail: detail,
      issue: issue,
    };
    console.log(input);
    try {
      const res = await userApi.report(userId, input);
      if (res.code === 200) {
        toast.success("User reported");
        onClose();
      }
    } catch (err: any) {
      if (err.code === 400) {
        toast.error("Description is too long");
      } else {
        toast.error(err.message);
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8 px-2 overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-2">
        <Heading title="Issue" />
        <Select value={issue} onValueChange={setIssue}>
          <SelectTrigger>
            <SelectValue placeholder="Choose the type of issue" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Issue</SelectLabel>
              {Object.entries(ReportIssue).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 h-[45vh]">
        <Heading title="Detail" />
        <textarea
          id="detail"
          className="border border-gray-400 size-full rounded-lg active:border-gray-950 p-6 no-scrollbar items-center flex justify-center"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Report user"
      actionLabel="Report"
      secondaryLabel="Cancel"
      secondaryAction={onClose}
      body={bodyContent}
      sm
    />
  );
};

export default ReportModal;
