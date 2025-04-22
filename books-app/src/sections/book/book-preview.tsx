import type { FC } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Link,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { utcToLocal } from "@/utils/format-date";

interface BookPreviewProps {
  id: string;
  isbn: string;
  notes?: string;
  rating?: number;
  readDate?: Date;
  summary?: string;
  title?: string;
}

export const BookPreview: FC<BookPreviewProps> = (props) => {
  const { id, isbn, rating, readDate, summary, title } = props;

  const formattedReadDate = utcToLocal(readDate!, false, false);
  const formattedRating = rating ? `${rating}/5` : "No rating provided";

  return (
    <Card sx={{ display: "flex", p: 2, maxWidth: 800, }}>
      <CardMedia
        component="img"
        image={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
        alt={title}
        sx={{ width: 200, height: 200, mr: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Typography
          variant="h6"
          component={Link}
          href={`/books/${id}`}
          underline="hover"
          sx={{ color: "purple", fontWeight: "bold", fontSize: "1.25rem" }}
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
          <Typography
            variant="body2"
            sx={{ color: "#666", fontStyle: "italic" }}
          >
            Date read: {formattedReadDate}.
          </Typography>
          {rating && (
            <Typography
              variant="body2"
              sx={{ color: "#666", fontStyle: "italic" }}
            >
              How strongly I recommend it: {formattedRating}
            </Typography>
          )}
        </Stack>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
};
