import { requests } from "@/utils/axios";

type PingResponse = Promise<{
  status: string;
}>;

class PingApi {
  async ping(): PingResponse {
    return requests.get("/ping");
  }
}

export const pingApi = new PingApi();