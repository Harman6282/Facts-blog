import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({
      success: false,
      message: "You must be logged in to create a blog",
    });
  }

  const { title, content }: { title: string; content: string } =
    await req.json();

  if (!title || !content) {
    return Response.json({
      success: false,
      message: "All fields are required",
    });
  }

  const slug = slugify(title, { lower: true }) + "-" + nanoid(10);

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      slug: slug as string,
      authorId: session?.user?.id as string,
    },
  });

  if (!blog) {
    return Response.json({
      success: false,
      message: "Failed to create blog",
    });
  }

  return Response.json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
};

export const GET = async () => {
  try {
    const blogs = await prisma.blog.findMany();

    return Response.json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch blogs",
      error,
    });
  }
};
