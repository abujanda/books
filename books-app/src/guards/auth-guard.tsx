import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
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
  const [checked, setChecked] = useState<boolean>(false);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString();
      const href = paths.auth.signIn + `?${searchParams}`;
      router.replace(href);
    }
  }, [isAuthenticated, router]);

  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
