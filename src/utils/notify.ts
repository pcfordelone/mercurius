import { toast } from "react-toastify";

interface INotify {
  message: string;
  type?: "success" | "error" | "warn" | "info" | undefined;
}

export const notify = ({ message, type }: INotify) => {
  if (type === "success") {
    toast.success(message);
    return;
  }

  if (type === "error") {
    toast.error(message);
    return;
  }

  if (type === "warn") {
    toast.warn(message);
    return;
  }

  if (type === "info") {
    toast.warn(message);
    return;
  }

  toast(message);
  return;
};
