"use client";

import type { ChangeEvent, FC } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import DomPurify from "dompurify";
import { useFormik } from "formik";
import { debounce } from "lodash";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { bookApi } from "@/api/book-api";
import { QuillEditor } from "@/components/quill-editor";
import { RouterLink } from "@/components/router-link";
import { useRouter } from "@/hooks/use-router";
import type { Tag } from "@/types/tag";

const validationSchema = Yup.object({
  isbn: Yup.string().required("ISBN is required"),
  notes: Yup.string().nullable(),
  rating: Yup.number().min(0).max(5),
  readDate: Yup.date().required("Read date is required"),
  summary: Yup.string(),
  tags: Yup.array().of(Yup.string()),
  title: Yup.string().required("Title is required"),
});

interface BookEditFormProps {
  bookId: string;
  isbn: string;
  notes?: string;
  rating?: number;
  readDate: Date;
  summary?: string;
  tags?: string[];
  tagOptionsLoading: boolean;
  tagOptions: Tag[];
  title: string;
}

export const BookEditForm: FC<BookEditFormProps> = (props) => {
  const { bookId, tagOptions, tagOptionsLoading } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      isbn: props.isbn,
      notes: props.notes || "",
      rating: props.rating || 0,
      readDate: new Date(props.readDate),
      submit: null,
      summary: props.summary || "",
      tags: props.tags || [],
      title: props.title,
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // Call the API to create a new book
        await bookApi.updateBook(bookId, {
          isbn: values.isbn,
          notes: DomPurify.sanitize(values.notes), // Sanitize HTML before sending to server,
          rating: values.rating,
          readDate: values.readDate,
          summary: values.summary,
          tags: values.tags,
          title: values.title,
        });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);

        // Redirect to the books page or show a success message
        toast.success("Book updated!");
        setTimeout(() => {
          router.push(`/books/${bookId}`);
        }, 2000);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to update book.");
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
    debounce((value: string) => {
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
    <form onSubmit={formik.handleSubmit}>
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
                  <div>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Tags
                    </Typography>
                    <Select
                      disabled={tagOptionsLoading}
                      fullWidth
                      multiple
                      name="tags"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      value={formik.values.tags}
                    >
                      {tagOptions.map((option, index) => (
                        <MenuItem key={index} value={option.slug}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
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
                <QuillEditor
                  onChange={handleNotesChange}
                  placeholder="Write something..."
                  sx={{ height: 400 }}
                  value={formik.values.notes}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button
            color="inherit"
            disabled={formik.isSubmitting}
            href={`/books/${bookId}`}
            LinkComponent={RouterLink}
          >
            Cancel
          </Button>
          <Button
            disabled={!formik.dirty || formik.isSubmitting}
            loading={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
