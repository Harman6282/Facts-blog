import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { currentUserId, targetUserId } = body;

    if (!currentUserId || !targetUserId) {
      return NextResponse.json(
        { success: false, message: "Missing user IDs." },
        { status: 400 }
      );
    }
    if (currentUserId === targetUserId) {
      return NextResponse.json(
        { success: false, message: "Cannot follow yourself." },
        { status: 400 }
      );
    }

    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    if (existing) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: targetUserId,
          },
        },
      });
      return NextResponse.json(
        { success: true, message: "Unfollowed" },
        { status: 200 }
      );
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      });
      return NextResponse.json(
        { success: true, message: "Followed" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Follow API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
