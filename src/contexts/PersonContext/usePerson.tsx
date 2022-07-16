import { useContext } from "react";
import { PersonContext } from "./index";

export const UsePersonContext = () => {
  const personContext = useContext(PersonContext);

  return personContext;
};
