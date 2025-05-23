import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {

  const session = await getServerSession();
  const userId = session?.user?.id;

  try {
    const users = await prisma.user.findMany({
        where: {
        AND: [
          { NOT: { id: userId } },
          { NOT: { followers: { some: { followerId: userId } } } },
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });

    if (!users) {
      return NextResponse.json(
        { success: false, message: "No users found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Users fetched successfully", users },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users", message: error },
      { status: 500 }
    );
  }
};
