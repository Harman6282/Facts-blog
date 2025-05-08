import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string(),
  slug: z.string().min(1, 'Slug is required'),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  readTime: z.string().optional(),
  authorId: z.string().min(1, 'Author is required'),
});

export type BlogData = z.infer<typeof blogSchema>;