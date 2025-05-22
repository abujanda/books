"use client";

import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { debounce } from "lodash";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Rating,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { bookApi } from "@/api/book-api";
import { Tip } from "@/components/tip";
import { Book } from "@/types/book";

interface Values {
  search: string;
  submit: null;
}

const initialValues: Values = {
  search: "",
  submit: null,
};

const validationSchema = Yup.object({
  search: Yup.string().max(255),
});

interface SearchDialogProps {
  onClose?: () => void;
  open?: boolean;
}

export const SearchDialog: FC<SearchDialogProps> = (props) => {
  const { onClose, open = false } = props;
  const [books, setBooks] = useState<Book[] | null>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const books = await bookApi.searchBooks(values.search);
        console.log(books);
        setBooks(books);

        helpers.setStatus({ success: true });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const handleSearchChange = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formik.setFieldValue("search", event.target.value);
    },
    500
  );

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Tip message="Search for a book by entering a keyword and pressing Enter" />
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            defaultValue={formik.values.search}
            error={!!(formik.touched.search && formik.errors.search)}
            fullWidth
            helperText={formik.touched.search && formik.errors.search}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <SearchMdIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              },
            }}
            label="Search"
            name="search"
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </Box>
        {formik.isSubmitting && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!formik.isSubmitting && books &&
          (books.length > 0 ? (
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h6">Books</Typography>
              <Stack
                divider={<Divider />}
                sx={{
                  borderColor: "divider",
                  borderRadius: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              >
                {books.map((book, index) => (
                  <Box key={index} sx={{ p: 2 }}>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                      sx={{ pl: 1 }}
                    >
                      <Badge color="primary" variant="dot" />
                      <Typography
                        component={Link}
                        href={`/books/${book.id}`}
                        variant="subtitle1"
                      >
                        {book.title}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} sx={{ pl: 2 }}>
                      <Rating
                        max={5}
                        precision={0.5}
                        readOnly
                        size="small"
                        value={book.rating || 0}
                      />
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {book.summary}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={0.5} sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="subtitle2">No results found</Typography>
              <Typography color="text.secondary" variant="body2">
                Try searching for a different keyword.
              </Typography>
            </Stack>
          ))}
      </DialogContent>
    </Dialog>
  );
};
