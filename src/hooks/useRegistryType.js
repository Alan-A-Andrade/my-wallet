import { useContext } from "react";
import RegistryContext from "../contexts/RegistryContext";

export default function useRegistryType() {
  return useContext(RegistryContext)
}