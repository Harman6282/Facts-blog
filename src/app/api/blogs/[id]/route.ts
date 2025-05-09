import { prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
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
