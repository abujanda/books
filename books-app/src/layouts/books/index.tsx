import type { FC, ReactNode } from "react";
import { withAuthGuard } from "@/hocs/with-auth-guard";
import { HorizontalLayout } from "./horizontal-layout";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = withAuthGuard((props) => {
  return (
    <HorizontalLayout
      // sections={sections}
      // navColor={settings.navColor}
      {...props}
    />
  );
});
