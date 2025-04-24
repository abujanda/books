"use client";

import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { Add as PlusIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import styles from "./page.module.css";
import { bookApi } from "@/api/book-api";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useMounted } from "@/hooks/use-mounted";
import { paths } from "@/paths";
import { BookPreview } from "@/sections/book/book-preview";
import { Book } from "@/types/book";

// https://sive.rs/book

const useBooks = () => {
  const isMounted = useMounted();
  const [state, setState] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    try {
      // TODO: Replace with authentication info
      const books = await bookApi.getBooks("67edaebdcafe04054f9b64ed");

      if (isMounted()) {
        setState(books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [isMounted]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { state, loading };
};

const Page: NextPage = () => {
  const { state, loading } = useBooks();

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <>
      <Seo title="Notes: Books Overview" />
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Notes</Typography>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  color="primary"
                  component={RouterLink}
                  href={paths.books.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              {state.map((book, index) => (
                <BookPreview
                  key={index}
                  id={book._id}
                  isbn={book.isbn}
                  notes={book.notes}
                  rating={book.rating}
                  readDate={book.readDate}
                  summary={book.summary}
                  title={book.title}
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
      {/* <div className={styles.page}>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div> */}
    </>
  );
};

export default Page;
