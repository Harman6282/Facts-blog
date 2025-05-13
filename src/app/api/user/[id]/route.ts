import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const userId = (await params)?.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        blogs: {
          select: {
            id: true,
            title: true,
            content: true,
            slug: true,
            likes: true,
            comments: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      user,
    });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
};
