import type { FC, ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { pingApi } from "@/api/ping-api";

type Status = {
  active: boolean;
};

const initialStatus: Status = {
  active: false,
};

interface State extends Status {}

const initialState: State = {
  ...initialStatus,
};

export const ApiStatusContext = createContext<State>({
  ...initialState,
});

interface ApiStatusProviderProps {
  children?: ReactNode;
}

export const ApiStatusProvider: FC<ApiStatusProviderProps> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Status>(initialStatus);

  const getApiStatus = async () => {
    try {
      const response = await pingApi.ping();

      if (response?.status === "awake") {
        setStatus({ active: true });
      }
    } catch (error) {
      console.warn("Failed to ping API:", error);
      setStatus({ active: false });
    }
  };

  useEffect(() => {
    getApiStatus();
  }, []);

  return (
    <ApiStatusContext.Provider value={{ ...status }}>
      {children}
    </ApiStatusContext.Provider>
  );
};

export const ApiStatusConsumer = ApiStatusContext.Consumer;
