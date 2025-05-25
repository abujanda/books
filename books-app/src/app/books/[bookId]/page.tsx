"use client";

import { useCallback, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { bookApi } from "@/api/book-api";
import { BreadcrumbsSeparator } from "@/components/breadcrumbs-separator";
import { LoadingBackdrop } from "@/components/loading-backdrop";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useMounted } from "@/hooks/use-mounted";
import { paths } from "@/paths";
import { BookActionsButton } from "@/sections/book/book-actions-button";
import { BookDeleteDialog } from "@/sections/book/book-delete-dialog";
import { BookNotes } from "@/sections/book/book-notes";
import { Page as PageType } from "@/types/page";
import { Book } from "@/types/book";

const useBook = () => {
  const isMounted = useMounted();
  const { bookId } = useParams<{ bookId: string }>() || {};
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBookGet = useCallback(async () => {
    try {
      const book = await bookApi.getBook(bookId as string);

      if (isMounted()) {
        setBook(book);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [isMounted]);

  useEffect(() => {
    if (bookId) {
      handleBookGet();
    }
  }, [handleBookGet]);

  return { book, loading };
};

const Page: PageType = () => {
  const { book, loading } = useBook();
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean }>({
    isOpen: false,
  });

  const handleDeleteDialogOpen = useCallback((): void => {
    setDeleteDialog({
      isOpen: true,
    });
  }, []);

  const handleDeleteDialogClose = useCallback((): void => {
    setDeleteDialog({
      isOpen: false,
    });
  }, []);

  if (loading) {
    return <LoadingBackdrop />;
  }

  if (!book) {
    return notFound();
  }

  return (
    <>
      <Seo title="Notes: View Book" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Book</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="primary"
                    component={RouterLink}
                    href={paths.index}
                    variant="subtitle2"
                  >
                    Notes
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    Book
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <BookActionsButton
                  bookId={book.id}
                  onDelete={handleDeleteDialogOpen}
                />
              </Stack>
            </Stack>
            <BookNotes
              dateRead={book.readDate!}
              isbn={book.isbn}
              notes={book.notes}
              rating={book.rating}
              summary={book.summary!}
              tags={book.tags}
              title={book.title}
            />
            <BookDeleteDialog
              bookId={book.id}
              onClose={handleDeleteDialogClose}
              open={deleteDialog.isOpen}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
