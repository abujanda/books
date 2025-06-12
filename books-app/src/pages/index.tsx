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
import { bookApi } from "@/api/book-api";
import { LoadingBackdrop } from "@/components/loading-backdrop";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import { Layout as BooksLayout } from "@/layouts/books";
import { paths } from "@/paths";
import { BookPreviewList } from "@/sections/book/book-preview-list";
import { Book } from "@/types/book";

// https://sive.rs/book

const useBooks = () => {
  const isMounted = useMounted();
  const { user } = useAuth();
  const [state, setState] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    try {
      const books = await bookApi.getBooks(user!.id);

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
    return <LoadingBackdrop />;
  }

  return (
    <>
      <Seo title="Notes: Books Overview" />
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Book Notes</Typography>
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
            <BookPreviewList books={state} />
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

Page.getLayout = (page) => <BooksLayout>{page}</BooksLayout>;

export default Page;
