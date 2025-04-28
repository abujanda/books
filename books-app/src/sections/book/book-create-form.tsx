"use client";

import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { debounce } from "lodash";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { bookApi } from "@/api/book-api";
import { PlateEditor } from "@/components/plate-editor";
import { RouterLink } from "@/components/router-link";
import { useRouter } from "@/hooks/use-router";
import { paths } from "@/paths";

interface Values {
  isbn: string;
  notes: string;
  rating: number;
  readDate: Date;
  submit: null;
  summary: string;
  title: string;
}

const initialValues: Values = {
  isbn: "",
  notes: "",
  rating: 0,
  readDate: new Date(),
  submit: null,
  summary: "",
  title: "",
};

const validationSchema = Yup.object({
  isbn: Yup.string().required("ISBN is required"),
  notes: Yup.string().nullable(),
  rating: Yup.number().min(0).max(5),
  readDate: Yup.date().required("Read date is required"),
  summary: Yup.string(),
  title: Yup.string().required("Title is required"),
});

export const BookCreateForm: FC = (props) => {
  const userId = "67edaebdcafe04054f9b64ed"; // TODO: Replace with actual user ID logic
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // Call the API to create a new book
        const book = await bookApi.createBook({
          isbn: values.isbn,
          notes: values.notes,
          rating: values.rating,
          readDate: values.readDate,
          summary: values.summary,
          title: values.title,
          userId: userId,
        });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);

        // Redirect to the books page or show a success message
        toast.success("Book created!");
        setTimeout(() => {
          router.push(`/books/${book._id}`);
        }, 2000);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to create book.");
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleNotesChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      formik.setFieldValue("notes", value);
    }, 1000),
    []
  );

  const handleDateReadChange = useCallback((date: Date | null) => {
    if (date) {
      formik.setFieldValue("readDate", date);
    }
  }, []);

  const handleSummaryChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      formik.setFieldValue("summary", value);
    }, 1000),
    []
  );

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">Basic details</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Rating
                      name="rating"
                      max={5}
                      onChange={formik.handleChange}
                      precision={0.5}
                      size="large"
                      value={formik.values.rating}
                      sx={{ ml: "auto" }}
                    />
                  </Box>
                  <TextField
                    error={!!(formik.touched.title && formik.errors.title)}
                    fullWidth
                    helperText={formik.touched.title && formik.errors.title}
                    label="Title"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <TextField
                    error={!!(formik.touched.isbn && formik.errors.isbn)}
                    fullWidth
                    helperText={formik.touched.isbn && formik.errors.isbn}
                    label="ISBN"
                    name="isbn"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                  />
                  <DatePicker
                    defaultValue={formik.values.readDate}
                    label="Date read"
                    name="readDate"
                    onChange={handleDateReadChange}
                  />
                  <TextField
                    defaultValue={formik.values.summary}
                    error={!!(formik.touched.summary && formik.errors.summary)}
                    fullWidth
                    helperText={formik.touched.summary && formik.errors.summary}
                    label="Summary"
                    name="summary"
                    onBlur={formik.handleBlur}
                    onChange={handleSummaryChange}
                    multiline
                    rows={4}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">Notes</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  defaultValue={formik.values.notes}
                  error={!!(formik.touched.notes && formik.errors.notes)}
                  fullWidth
                  helperText={formik.touched.notes && formik.errors.notes}
                  name="notes"
                  onBlur={formik.handleBlur}
                  onChange={handleNotesChange}
                  placeholder="Write something..."
                  multiline
                  rows={8}
                />
              </Grid>

              {/* <PlateEditor
                  onChange={(value) => {
                    formik.setFieldValue("notes", value);
                  }}
                  placeholder="Write something"
                  sx={{ height: 400 }}
                  value={formik.values.notes}
                /> */}
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button color="inherit" href={paths.index} LinkComponent={RouterLink}>
            Cancel
          </Button>
          <Button
            loading={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
