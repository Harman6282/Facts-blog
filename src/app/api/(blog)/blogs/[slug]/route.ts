import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;

    const blog = await prisma.blog.findFirst({
      where: { slug: slug },
       include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
          },
        },
        _count: {
          select:{
            likes: true,
            comments: true
          }
        }
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog fetched successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const blogId = (await params).id;
//   try {
//     const blog = await prisma.blog.delete({
//       where: { id: blogId },
//     });

//     if (!blog) {
//       return NextResponse.json(
//         { success: false, message: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Blog deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete blog" },
//       { status: 500 }
//     );
//   }
// }
