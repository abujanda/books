import { Request, Response } from "express";
import * as tagService from "../services/tag-service";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getTags();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags" });
  }
};
