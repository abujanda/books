import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "../../layouts/auth/classic-layout";
import { paths } from "../../paths";
import { GuestGuard } from "../../guards/guest-guard";
import { JWTLogin } from "@/sections/auth/jwt-login";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in to your account</title>
      </Head>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  //href={paths.auth.signup}
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
  <GuestGuard>
    <AuthLayout>{page}</AuthLayout>
  </GuestGuard>
);

export default Page;
