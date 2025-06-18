import type { FC } from "react";
import { useState } from "react";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import {
  Box,
  Collapse,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

interface FaqType {
  question: string;
  answer: string;
}

const faqs: FaqType[] = [
  {
    question: "Is this app free?",
    answer:
      "Yes! The core features are free forever. Premium options are coming soon.",
  },
  {
    question: "Do I need to install anything?",
    answer: "Nope. Book Notes is 100% web-based. Just sign up and go.",
  },
  {
    question: "Can I use it on my phone?",
    answer:
      "Yes! The site is mobile-friendly and works on all modern browsers.",
  },
];

interface FaqProps {
  answer: string;
  question: string;
}

const Faq: FC<FaqProps> = (props) => {
  const { answer, question } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: "pointer" }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="subtitle1">{question}</Typography>
        <SvgIcon>
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Typography color="text.secondary" variant="body2">
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  );
};

export const HomeFaqs: FC = () => {
  return (
    <Box sx={{ py: "120px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h3">Everything you need to know</Typography>
              <Typography color="text.secondary" variant="subtitle2">
                Frequently asked questions
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {faqs.map((faq, index) => (
                <Faq key={index} {...faq} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
