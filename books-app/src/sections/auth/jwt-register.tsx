import type { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthConfig } from "./config";
import { PasswordField } from "@/components/password-field";
import { AuthContextType } from "@/contexts/auth/jwt-context";
import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import { useSearchParams } from "@/hooks/use-search-params";
import { paths } from "@/paths";
import type { SignUpOptions } from "@/types/auth";

interface Values {
  email: string;
  name: string;
  password: string;
  submit: null;
}

// const initialValues : Values = {
//   email: "",
//   name: "",
//   password: "",
//   submit: null,
// };

const initialValues : Values = {
  email: "john.doe@testing.com",
  name: "John Doe",
  password: "Pa$$w0rd",
  submit: null,
};

const validationSchema = Yup.object({
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
});

export const JWTRegister: FC = () => {
  const isMounted = useMounted();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { signUp } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
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

          window.location.href = returnTo || paths.books.index;
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
          {/* <TextField
            error={Boolean(formik.touched.company && formik.errors.company)}
            fullWidth
            helperText={formik.touched.company && formik.errors.company}
            label="Company (optional)"
            name="company"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.company}
          /> */}
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
            <Link href="#">Terms of Service</Link> and acknowledge the{" "}
            <Link href="#">Privacy Policy</Link>.
          </Typography>
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
          Register
        </Button>
      </form>
    </>
  );
};
