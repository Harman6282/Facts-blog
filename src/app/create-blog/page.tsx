"use client";
import { Button } from "@/components/ui/button";
import { BlogFormData, blogSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  // ! console.log(errors)

  const onSubmit: SubmitHandler<BlogFormData> = async (data: BlogFormData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/blogs", data);
      console.log(res.data);
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-10">
      <h1 className="text-3xl font-bold">Protected Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input {...register("title")} className="border p-2 w-full" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label>Content</label>
          <textarea
            {...register("content")}
            className="border p-2 w-full"
            rows={6}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </Button>
      </form>

      {}
    </div>
  );
};

export default Page;
