import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: String, default: "Anonymous"},
        images: {type: [String], default: []},
        createdAt: {type: Date, default: Date.now},
    },
    { collection: "blogs"}
)

export default mongoose.models.Blog || mongoose.model("blog", BlogSchema);