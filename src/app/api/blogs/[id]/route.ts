import { prisma } from "@/lib/prisma";

export const GET = async (
  req: Request, context: {params: { id: string } }
) => {
  try {
    const blogId = context.params.id;
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) {
      return Response.json({
        success: false,
        message: "Blog not found",
      });
    }
    return Response.json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch blog",
      error,
    });
  }
};
