"use client";

import type { FC } from "react";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { BookCover } from "./book-cover";
import { utcToLocal } from "@/utils/format-date";

interface BookNotesProps {
  dateRead: Date;
  isbn: string;
  notes?: string;
  rating?: number;
  summary: string;
  tags?: string[];
  title: string;
}

export const BookNotes: FC<BookNotesProps> = (props) => {
  const { dateRead, isbn, notes, rating, summary, tags = [], title } = props;
  const formattedReadDate = utcToLocal(dateRead, false, false);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <BookCover height={150} isbn={isbn} title={title} width={100} />
        <Stack spacing={1}>
          <Stack spacing={1}>
            <Typography variant="h5">{title}</Typography>
            <Typography color="text.secondary" variant="subtitle1">
              ISBN: {isbn}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Date read: {formattedReadDate}
            </Typography>
            {rating !== undefined && (
              <Typography color="text.secondary" variant="subtitle1">
                Rating: {rating}/5
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={1}>
            {tags.map((tag) => (
              <Chip
                color="info"
                key={tag}
                label={tag}
                size="small"
                variant="filled"
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Summary</Typography>
          <Typography variant="body1">{summary}</Typography>
        </Stack>
      </Paper>
      {notes && (
        <Paper elevation={1} sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Notes</Typography>
            <div dangerouslySetInnerHTML={{ __html: notes }} />
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};
