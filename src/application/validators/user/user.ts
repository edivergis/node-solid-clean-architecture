import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(6, 'Name must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6).max(255)
});