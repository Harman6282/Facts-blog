import ProfilePage from "@/components/ProfilePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

const page = async ({ params }: ProfilePageProps) => {
  const userId = (await params).userId;

  const session = await getServerSession();

  if(!session){
    redirect("/")
  }

  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
};

export default page;
