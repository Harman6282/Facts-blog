"use client";
import { Button } from "@/components/ui/button";
import { BlogFormData, blogSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import {Loader2} from "lucide-react"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/FileUpload";

const Page = () => {
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }
  const [posting, setPosting] = useState(false);

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
      setPosting(true);
      const res = await axios.post("http://localhost:3000/api/blogs", data);
      console.log(res.data);
      toast.success(res.data.message);
      setPosting(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-10">
      <h1 className="text-3xl font-bold">Create Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} className="border border-black p-2 w-full mt-1" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div >
          <Label htmlFor="content" >Content</Label>
          <Textarea
            {...register("content")}
            className="border p-2 mt-1 w-full border-black"
            rows={6}
            id="content"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <FileUpload onSuccess={(data) => console.log(data)}/>

        <Button
          type="submit"
          variant="default"
          className=" px-4 py-2 rounded" 
          disabled={posting}
        >
          {posting ?  <Loader2 className="animate-spin"/>: "Post"}
        </Button>
      </form>

      {}
    </div>
  );
};

export default Page;
