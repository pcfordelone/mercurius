import { useContext } from "react";
import { CategoryContext } from "./index";

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  return context;
};
