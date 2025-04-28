"use client";

import type { FC } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { bookApi } from "@/api/book-api";
import { useRouter } from "@/hooks/use-router";
import { AlertTriangle as AlertTriangleIcon } from "@untitled-ui/icons-react";
import { paths } from "@/paths";

interface BookDeleteDialogProps {
  bookId: string;
  onClose?: () => void;
  open?: boolean;
}

export const BookDeleteDialog: FC<BookDeleteDialogProps> = (props) => {
  const { bookId, onClose, open } = props;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      submit: null,
    },
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await bookApi.deleteBook(bookId);

        onClose?.();
        toast.success("Book deleted successfully.")
        router.push(paths.index);
      } catch (err: any) {
        console.error(err);
        toast.success("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            p: 3,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "error.lightest",
              color: "error.main",
            }}
          >
            <SvgIcon>
              <AlertTriangleIcon />
            </SvgIcon>
          </Avatar>
          <div>
            <Typography variant="h5">Delete book</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              Are you sure you want to delete this book? All of this book's data
              will be permanently removed. This action cannot be undone.
            </Typography>
          </div>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pb: 3,
            px: 3,
          }}
        >
          <Button color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
            sx={{
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
            type="submit"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
