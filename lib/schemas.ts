import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string().nullable().optional(),
});

export const PostSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    content: z.string().nullable().optional(),
    published: z.boolean().default(false),
    authorId: z.string(),
});
