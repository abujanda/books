import type { FC, ReactNode } from "react";
import { HorizontalLayout } from "./horizontal-layout";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  return (
    <HorizontalLayout
      // sections={sections}
      // navColor={settings.navColor}
      {...props}
    />
  );
};
