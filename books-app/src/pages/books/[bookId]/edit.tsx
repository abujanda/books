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
import { tagApi } from "@/api/tag-api";
import { BreadcrumbsSeparator } from "@/components/breadcrumbs-separator";
import { Layout as BooksLayout } from "@/layouts/books";
import { LoadingBackdrop } from "@/components/loading-backdrop";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useMounted } from "@/hooks/use-mounted";
import { paths } from "@/paths";
import { BookEditForm } from "@/sections/book/book-edit-form";
import { Book } from "@/types/book";
import { Page as PageType } from "@/types/page";
import type { Tag } from "@/types/tag";

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

const useTags = () => {
  const isMounted = useMounted();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const getTags = useCallback(async () => {
    try {
      const tags = await tagApi.getTags();

      if (isMounted()) {
        setTags(tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }, [isMounted]);

  useEffect(() => {
    getTags();
  }, [getTags]);

  return { tags, loading };
};

const Page: PageType = () => {
  const { book, loading: bookLoading } = useBook();
  const { tags, loading: tagsLoading } = useTags();

  if (bookLoading) {
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
                  color="text.primary"
                  component={RouterLink}
                  href={paths.books.index}
                  variant="subtitle2"
                >
                  Books
                </Link>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={`/books/${book.id}`}
                  variant="subtitle2"
                >
                  {book.id}
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  Edit
                </Typography>
              </Breadcrumbs>
            </Stack>
            <BookEditForm
              bookId={book.id}
              isbn={book.isbn}
              notes={book.notes}
              rating={book.rating}
              readDate={book.readDate}
              summary={book.summary}
              tags={book.tags}
              tagOptions={tags}
              tagOptionsLoading={tagsLoading}
              title={book.title}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <BooksLayout>{page}</BooksLayout>;

export default Page;
