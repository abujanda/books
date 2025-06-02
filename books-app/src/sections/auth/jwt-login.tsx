import type { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PasswordField } from "@/components/password-field";
import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import { useSearchParams } from "@/hooks/use-search-params";
import { SignInOptions } from "@/types/auth";
import { paths } from "@/paths";

interface Values {
  email: string;
  password: string;
  staySignedIn: boolean;
  submit: null;
}

const initialValues: Values = {
  email: "john.doe@testing.com",
  password: "Pa$$w0rd",
  staySignedIn: false,
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address.")
    .max(255)
    .required("This information is required."),
  password: Yup.string().max(255).required("This information is required."),
  staySignedIn: Yup.boolean(),
});

export const JWTLogin: FC = (props) => {
  const { signIn } = useAuth();
  const isMounted = useMounted();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const options: SignInOptions = {
          email: values.email,
          password: values.password,
          staySignedIn: values.staySignedIn,
        };

        await signIn(options);

        if (isMounted()) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);

          window.location.href = returnTo || paths.index;
        }
      } catch (err: any) {
        console.error(err);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.data.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.email}
          />
          <PasswordField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.password}
          />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              ml: -1,
              mt: 1,
            }}
          >
            <Checkbox
              checked={formik.values.staySignedIn}
              name="staySignedIn"
              onChange={formik.handleChange}
            />
            <Typography color="text.primary" variant="subtitle2">
              Stay signed in for a week
            </Typography>
          </Box>
          {formik.errors.submit && (
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          )}
        </Stack>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth
          loading={formik.isSubmitting}
          size="small"
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </form>
    </>
  );
};
