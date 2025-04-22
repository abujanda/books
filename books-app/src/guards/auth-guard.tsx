import type { FC, ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/use-auth";
import { paths } from "../paths";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    router.replace(paths.auth.signIn);
    return null;
  }

  if (user?.emailConfirmed === false) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    router.replace(paths.auth.verifyEmail.index);
    return null;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    router.replace(requestedLocation);
    return null;
  }

  return <>{children}</>;
};
