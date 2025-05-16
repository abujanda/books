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
import { tagApi } from "@/api/tag-api";
import { BreadcrumbsSeparator } from "@/components/breadcrumbs-separator";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { useMounted } from "@/hooks/use-mounted";
import { paths } from "@/paths";
import { BookCreateForm } from "@/sections/book/book-create-form";
import type { Page as PageType } from "@/types/page";
import type { Tag } from "@/types/tag";

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
  const { tags, loading } = useTags();

  return (
    <>
      <Seo title="Notes: Create Book" />
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
              <Typography variant="h4">Create a book</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.index}
                  variant="subtitle2"
                >
                  Notes
                </Link>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.books.index}
                  variant="subtitle2"
                >
                  Books
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  Create
                </Typography>
              </Breadcrumbs>
            </Stack>
            <BookCreateForm tagOptions={tags} tagOptionsLoading={loading} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
