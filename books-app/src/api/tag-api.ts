import type { Tag } from "@/types/tag";
import { requests } from "@/utils/axios";

class TagApi {
  getTags(): Promise<Tag[]> {
    return requests.get("/tags");
  }
}

export const tagApi = new TagApi();
