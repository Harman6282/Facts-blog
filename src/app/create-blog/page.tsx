"use client";
import { Button } from "@/components/ui/button";
import { BlogFormData, blogSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";
import TipTapEditor from "@/components/TiptapEditor";

const Page = () => {
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }
  const [posting, setPosting] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    setValue("content", editorContent); // update RHF form
  }, [editorContent]);
  // ! console.log(errors)

  const handleUploadSuccess = (data: { url: string }) => {
    setValue("imageUrl", data.url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<BlogFormData> = async (data: BlogFormData) => {
    try {
      setPosting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
        data
      );
      console.log(res.data);
      toast.success(res.data.message);
      setPosting(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog");
    }
  };

  const imageUrl = watch("imageUrl");

  return (
    <div className="w-full md:w-2/3 px-10 mx-auto mt-9">
      <h1 className="text-3xl font-bold">Create Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <Label>Title</Label>
          <Input
            {...register("title")}
            className="border border-black p-2 w-full mt-1"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <TipTapEditor content="" onChange={setEditorContent} />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <FileUpload onSuccess={handleUploadSuccess} />

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="preview"
            className="max-h-48 rounded border mt-2"
            width={600}
            height={500}
          />
        )}
        <Button
          type="submit"
          variant="default"
          className=" px-4 py-2 rounded"
          disabled={posting}
        >
          {posting ? <Loader2 className="animate-spin" /> : "Post"}
        </Button>
      </form>

      {}
    </div>
  );
};

export default Page;
