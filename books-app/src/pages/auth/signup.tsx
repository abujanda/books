import type { NextPage } from "next";
import Head from "next/head";
import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { Layout as AuthLayout } from "../../layouts/auth/classic-layout";
import { paths } from "../../paths";
import { GuestGuard } from "../../guards/guest-guard";
import { JWTRegister } from "../../sections/auth/jwt-register";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create account</title>
      </Head>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  href={paths.auth.signin}
                  underline="hover"
                  variant="subtitle2"
                >
                  Sign in
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Create account"
          />
          <CardContent>
            <JWTRegister />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <GuestGuard>
    <AuthLayout>
      {page}
    </AuthLayout>
  </GuestGuard>
)

export default Page;
