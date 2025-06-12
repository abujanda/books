import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { Seo } from "@/components/seo";
import { Layout as AuthLayout } from "@/layouts/auth/classic-layout";
import { paths } from "@/paths";
import { GuestGuard } from "@/guards/guest-guard";
import { IssuerGuard } from "@/guards/issuer-guard";
import { JWTLogin } from "@/sections/auth/jwt-login";
import { Page as PageType } from "@/types/page";
import { Issuer } from "@/utils/auth";

const Page: PageType = () => {
  return (
    <>
      <Seo title="Sign in to your account" />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  href={paths.auth.jwt.signup}
                  underline="hover"
                  variant="subtitle2"
                >
                  Sign up!
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Sign in"
          />
          <CardContent>
            <JWTLogin />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Link
                //href={paths.auth.forgotPassword}
                underline="none"
                variant="subtitle2"
              >
                Forgot password?
              </Link>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Jwt}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
