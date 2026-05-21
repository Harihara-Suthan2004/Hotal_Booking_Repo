import { z } from 'zod'

export const createProductSchema = z.object({
        name: z.string().min(3, "Title must be atleast 3 character"),
        description: z.string().min(10, "Description is too short"),
        price: z.number().positive("price must be grater than 0"),
        image: z.string().url("Image must be valid URL"),
        category: z.string().optional(),
        is_available: z.boolean().optional(),
});