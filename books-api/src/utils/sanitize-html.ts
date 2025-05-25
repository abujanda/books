import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDomPurify(window);

export const sanitizeHTML = (html?: string) => {
  return html ? DOMPurify.sanitize(html) : "";
};
