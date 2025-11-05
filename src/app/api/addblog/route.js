import { connectToDatabase } from "../../../../lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(request) {
    try {
        const { title, content, author, images } = await request.json();
        if(!title || !content) {
            return new Response(
                JSON.stringify({ message: "Title and content are required" }),
                {status: 400}
            );
        }

        await connectToDatabase();
        const newBlog = Blog.create({ title, content, author, 
            images: Array.isArray(images) ? images : [] });
        return new Response(JSON.stringify(newBlog), { status: 201});
    } catch (error) {
        console.error("Error adding Blog", error);
        return new Response(JSON.stringify({ message: "Error adding blog"}), {
            status: 500,
        })
    }
}