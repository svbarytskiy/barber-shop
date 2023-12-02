import { useContext } from "react";
import { Context } from "..";

export const useStore = () => {
  const { store } = useContext(Context);
  return { store };
};