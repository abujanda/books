"use client";

import { useCallback, useEffect, useState } from "react";
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
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useMounted } from "@/hooks/use-mounted";
import { paths } from "@/paths";
import { BookNotes } from "@/sections/book/book-notes";
import { Page as PageType } from "@/types/page";
import { useParams } from "next/navigation";
import { Book } from "@/types/book";

const useBook = () => {
  const isMounted = useMounted();
  const { bookId } = useParams<{ bookId: string }>() || {};
  const [book, setBook] = useState<Book | null>(null);

  const handleBookGet = useCallback(async () => {
    try {
      const book = await bookApi.getBook(bookId as string);

      if (isMounted()) {
        setBook(book);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMounted]);

  useEffect(() => {
    if (bookId) {
      handleBookGet();
    }
  }, []);

  return book;
};

const Page: PageType = () => {
  const book = useBook();

  if (!book) {
    return (
      <div className="page">
        <main className="main">
          <h1>Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <>
      <Seo title="Book" />
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
            <BookNotes
              dateRead={book.readDate!}
              isbn={book.isbn}
              notes={book.notes}
              rating={book.rating}
              summary={book.summary!}
              title={book.title}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
