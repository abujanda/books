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
import { Page as PageType } from "@/types/page";
import { Book } from "@/types/book";
import { BookEditForm } from "@/sections/book/book-edit-form";

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
  }, []);

  return { book, loading };
};

const Page: PageType = () => {
  const { book, loading } = useBook();

  if (loading) {
    return <LoadingBackdrop />;
  }

  if (!book) {
    return notFound();
  }

  return (
    <>
      <Seo title="Notes: Update Book" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Edit book</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="primary"
                  component={RouterLink}
                  href={paths.index}
                  variant="subtitle2"
                >
                  Notes
                </Link>
                <Link
                  color="primary"
                  component={RouterLink}
                  href={`/books/${book._id}`}
                  variant="subtitle2"
                >
                  Book
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  Edit
                </Typography>
              </Breadcrumbs>
            </Stack>
            <BookEditForm
              bookId={book._id}
              isbn={book.isbn}
              notes={book.notes}
              rating={book.rating}
              readDate={book.readDate}
              summary={book.summary}
              title={book.title}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
