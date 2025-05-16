import { tags } from "./data";
import Tag from "../../models/tagModel";

const seedTags = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingTags = await Tag.find({});

      if (existingTags.length > 0) {
        console.log("Tags already seeded. Skipping seeding.");
        resolve(true);
        return;
      }

      await Tag.insertMany(tags);
      console.log("Tags seeded successfully.");
      resolve(true);
    } catch (error) {
      console.error("Error seeding tags:", error);
      reject(error);
    }
  });
};

export default seedTags;
