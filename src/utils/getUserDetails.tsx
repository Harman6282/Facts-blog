import { prisma } from "@/lib/prisma";

const getUserDetails = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    return user;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to fetch user details",
    };
  }
};

export default getUserDetails;
