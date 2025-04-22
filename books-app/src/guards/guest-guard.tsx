import type { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { paths } from "../paths";

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace(paths.index);

    return null;
  }

  return <>{children}</>;
};
