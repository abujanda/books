import { useContext } from "react";
import { ApiStatusContext } from "@/contexts/api-status-context";

export const useApiStatus = () => useContext(ApiStatusContext);
