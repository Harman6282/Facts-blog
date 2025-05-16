
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, blogId } = body;

    if (!userId  || !blogId) {
      return NextResponse.json(
        { success: false, message: "Missing user IDs." },
        { status: 400 }
      );
    }

    const existing = await prisma.like.findUnique({
      where: {
        userId_blogId: {
            userId,
            blogId
        }
      },
    });

    if (existing) {
      // UnLike
      await prisma.like.delete({
        where: {
          userId_blogId: {
            userId,
            blogId
          }
        },
      });
      return NextResponse.json(
        { success: true, message: "UnLiked" ,  isLiked: false  },
        { status: 200 }
      );
    } else {
      // Like
      await prisma.like.create({
        data: {
           userId,
           blogId
        },
      });
      return NextResponse.json(
        { success: true, message: "Liked",  isLiked: true  },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Like Blog API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
