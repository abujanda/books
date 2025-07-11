import { useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import type { AuthContextType } from "@/contexts/auth/firebase-context";
import { GuestGuard } from "@/guards/guest-guard";
import { IssuerGuard } from "@/guards/issuer-guard";
import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
//import { usePageView } from '@/hooks/use-page-view';
import { useSearchParams } from "@/hooks/use-search-params";
import { Layout as AuthLayout } from "@/layouts/auth/classic-layout";
import { paths } from "@/paths";
//import { AuthIssuer } from '@/sections/auth/auth-issuer';
import type { Page as PageType } from "@/types/page";
import { Issuer } from "@/utils/auth";

interface Values {
  email: string;
  password: string;
  submit: null;
}

const initialValues: Values = {
  email: "demo@booknotes.com",
  password: "Password123!",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Page: PageType = () => {
  const isMounted = useMounted();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { issuer, signInWithEmailAndPassword, signInWithGoogle } =
    useAuth<AuthContextType>();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);

        if (isMounted()) {
          // returnTo could be an absolute path
          window.location.href = returnTo || paths.books.index;
        }
      } catch (err: any) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleGoogleClick = useCallback(async (): Promise<void> => {
    try {
      await signInWithGoogle();

      if (isMounted()) {
        // returnTo could be an absolute path
        window.location.href = returnTo || paths.books.index;
      }
    } catch (err) {
      console.error(err);
    }
  }, [signInWithGoogle, isMounted, returnTo]);

  //usePageView();

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
                  component={RouterLink}
                  href={paths.auth.firebase.signup}
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
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <Button
                  fullWidth
                  onClick={handleGoogleClick}
                  size="large"
                  sx={{
                    backgroundColor: "common.white",
                    color: "common.black",
                    "&:hover": {
                      backgroundColor: "common.white",
                      color: "common.black",
                    },
                  }}
                  variant="contained"
                >
                  <Box
                    alt="Google"
                    component="img"
                    src="/assets/logos/logo-google.svg"
                    sx={{ mr: 1 }}
                  />
                  Google
                </Button>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mt: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Divider orientation="horizontal" />
                  </Box>
                  <Typography
                    color="text.secondary"
                    sx={{ m: 2 }}
                    variant="body1"
                  >
                    OR
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Divider orientation="horizontal" />
                  </Box>
                </Box>
              </Box>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 3 }}>
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Box sx={{ mt: 2 }}>
                <Button
                  disabled={formik.isSubmitting}
                  fullWidth
                  loading={formik.isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Alert severity="error">
            <div>
              You can use <b>demo@booknotes.com</b> and password <b>Password123!</b>
            </div>
          </Alert>
          {/* <AuthIssuer issuer={issuer} /> */}
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Firebase}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
