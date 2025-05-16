import type { FC } from "react";
import Image from "next/image";
import { Typography, Link, Card, CardContent, Stack } from "@mui/material";
import { utcToLocal } from "@/utils/format-date";

interface BookPreviewProps {
  id: string;
  isbn: string;
  notes?: string;
  rating?: number;
  readDate?: Date;
  summary?: string;
  title: string;
}

export const BookPreview: FC<BookPreviewProps> = (props) => {
  const { id, isbn, rating, readDate, summary, title } = props;

  const formattedReadDate = utcToLocal(readDate!, false, false);
  const formattedRating = rating ? `${rating}/5` : "No rating provided";
  console.log(formattedRating);

  return (
    <Card raised>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" spacing={2}>
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
            alt={title}
            width={150}
            height={200}
          />
          <div>
            <Typography
              variant="h5"
              component={Link}
              fontWeight="bold"
              href={`/books/${id}`}
              underline="hover"
            >
              {title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Typography
                color="text.secondary"
                fontStyle="italic"
                variant="body2"
              >
                Date read: {formattedReadDate}.
              </Typography>
              {rating !== undefined && (
                <Typography
                  color="text.secondary"
                  fontStyle="italic"
                  variant="body2"
                >
                  How strongly I recommend it: {formattedRating}
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {summary}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
