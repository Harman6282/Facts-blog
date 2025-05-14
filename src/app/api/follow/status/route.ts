import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentUserId = searchParams.get("currentUserId");
  const targetUserId = searchParams.get("targetUserId");

  if (!currentUserId || !targetUserId) {
    return NextResponse.json(
      { success: false, isFollowing: false, message: "Missing user IDs." },
      { status: 400 }
    );
  }

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  return NextResponse.json({ isFollowing: !!follow });
}
