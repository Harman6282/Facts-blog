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

  const { title, content, imageUrl }: { title: string; content: string, imageUrl: string } =
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
      imageUrl,
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
    const blogs = await prisma.blog.findMany({
        include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count:{
          select:{
            likes: true,
            comments: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc", // optional: fetch latest blogs first
      },
    });

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
