'use client';

import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "@/components/breadcrumbs-separator";
import { RouterLink } from "@/components/router-link";
import { Seo } from "@/components/seo";
import { paths } from "@/paths";
import { BookCreateForm } from "@/sections/book/book-create-form";
import type { Page as PageType } from "@/types/page";

const Page: PageType = () => {
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
              <Typography variant="h4">Create a new book</Typography>
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
            <BookCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
