import type { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthConfig } from "./config";
import { PasswordField } from "../../components/password-field";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import type { SignUpOptions } from "../../types/auth";

export const JWTRegister: FC = () => {
  const isMounted = useMounted();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues: {
      company: "",
      email: "",
      name: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      company: Yup.string().max(255).nullable(),
      email: Yup.string()
        .email("Invalid email address.")
        .max(255)
        .required("This information is required."),
      name: Yup.string().max(255).required("This information is required."),
      password: Yup.string()
        .required("This information is required")
        .test(
          "password",
          "Password must contain at least 8 characters and combine uppercase letters, lowercase letters, numbers, and symbols.",
          (value) => {
            if (!value) {
              return false;
            }

            if (!AuthConfig.passwordRegex.test(value)) {
              return false; // Validation failed
            }

            return true; // Validation succeeded
          }
        ),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const options: SignUpOptions = {
          email: values.email,
          name: values.name,
          password: values.password,
        };

        await signUp(options);

        if (isMounted()) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
        }
      } catch (err: any) {
        console.error(err);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.data });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email address"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          size="small"
          value={formik.values.email}
        />
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Full name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          size="small"
          value={formik.values.name}
        />
        <TextField
          error={Boolean(formik.touched.company && formik.errors.company)}
          fullWidth
          helperText={formik.touched.company && formik.errors.company}
          label="Company (optional)"
          name="company"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          size="small"
          value={formik.values.company}
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
        <Typography color="text.secondary" variant="caption">
          By signing up, I accept the the{" "}
          <Link href="#">Terms of Service</Link> and acknowledge
          the <Link href="#">Privacy Policy</Link>.
        </Typography>
        {formik.errors.submit && (
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        )}
      </Stack>
      <LoadingButton
        color="primary"
        disabled={formik.isSubmitting}
        fullWidth
        loading={formik.isSubmitting}
        size="small"
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
      >
        Create
      </LoadingButton>
    </form>
  );
};
