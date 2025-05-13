import BlogDetailsPage from "@/app/blog/[slug]/BlogDetailsPage";
import React from "react";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: BlogPageProps) => {
  const slug = (await params).slug
  return <BlogDetailsPage slug={slug} />;
};

export default Page;
