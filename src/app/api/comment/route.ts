import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text, blogId, authorId } = await req.json();

  if (!text || !blogId || !authorId) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        blogId,
        authorId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Comment posted successfully", comment },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to post comment" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { success: false, message: "Missing blogId" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        blogId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },

      orderBy:{
        createdAt:"desc"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};
