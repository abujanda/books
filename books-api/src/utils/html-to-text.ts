import { htmlToText } from "html-to-text";

export const convertHtmlToText = (html: string): string => {
  const text = htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true, // keep paragraph structure for post-processing
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "h3", format: "heading" },
      { selector: "h4", format: "heading" },
      { selector: "h5", format: "heading" },
      { selector: "h6", format: "heading" },
      {
        selector: "p",
        options: { leadingLineBreaks: 1, trailingLineBreaks: 1 },
      },
      { selector: "ul", format: "list" },
      { selector: "ol", format: "list" },
      { selector: "li", format: "listItem" },
      { selector: "blockquote", format: "blockQuote" },
    ],
  });

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\\n");
};
