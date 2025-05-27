import type { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PasswordField } from "@/components/password-field";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { SignInOptions } from "../../types/auth";

export const JWTLogin: FC = (props) => {
  const isMounted = useMounted();
  const { signIn } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      staySignedIn: true,
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address.")
        .max(255)
        .required("This information is required."),
      password: Yup.string().max(255).required("This information is required."),
      staySignedIn: Yup.boolean(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const options = values as SignInOptions;

        await signIn(options);

        if (isMounted()) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
        }
      } catch (err: any) {
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
        Sign in
      </LoadingButton>
    </form>
  );
};
