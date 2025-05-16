import Tag from "../models/tagModel";

export const getTags = async () => {
    try {
        const tags = await Tag.find();

        if (!tags) {
        throw new Error("Tags not found");
        }
        return tags.map((tag) => ({
        ...tag.toDataTransferObject(),
        }));
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}