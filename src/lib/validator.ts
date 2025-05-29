import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  readTime: z.string().optional(),
  imageUrl: z
    .string()
    .url("Invalid image URL")
    .nonempty("Please upload an image")
    .optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;
