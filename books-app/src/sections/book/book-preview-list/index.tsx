import type { FC } from "react";
import { Add as PlusIcon } from "@mui/icons-material";
import { Notes as NotesIcon } from "@mui/icons-material";
import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { RouterLink } from "@/components/router-link";
import { paths } from "@/paths";
import { Book } from "@/types/book";
import { BookPreview } from "./book-preview";

interface BookPreviewListProps {
  books: Book[];
}

export const BookPreviewList: FC<BookPreviewListProps> = (props) => {
  const { books = [] } = props;

  if (books.length === 0) {
    return (
      <Stack
    
        sx={{
          alignItems: "center",
          backgroundColor: "neutral.50",
          justifyContent: "center",
          minHeight: 400,
          my: "auto",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 3,
            width: 400,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: blueGrey[50],
              borderRadius: 1,
              display: "flex",
              height: 40,
              justifyContent: "center",
              mb: 2,
              width: 40,
            }}
          >
            <SvgIcon fontSize="medium">
              <NotesIcon />
            </SvgIcon>
          </Box>
          <Typography sx={{ mb: 1 }} variant="h6">
            Add your first book
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Start reading and add your favorite quotes.
          </Typography>
          <Button
            component={RouterLink}
            href={paths.books.create}
            startIcon={<PlusIcon fontSize="small" />}
            size="small"
            sx={{ mt: 3 }}
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {books.map((book, index) => (
        <BookPreview
          key={index}
          id={book.id}
          isbn={book.isbn}
          notes={book.notes}
          rating={book.rating}
          readDate={book.readDate}
          summary={book.summary}
          title={book.title}
        />
      ))}
    </Stack>
  );
};
