import { delimiter } from 'path';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(8, 'Your password must be longer than 3 charcters. ')
    .max(22, 'Your password may not be longer than 22 characters.'),
  username: z
    .string()
    .min(3, 'Your username must be longer than 3 charcters. ')
    .max(18, 'Your username may not be longer than 18 characters.'),
  name: z.string().regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, 'Invalid name.'),
  dateOfBirth: z
    .string()
    .transform((date) => {
      return new Date(date);
    })
    .refine((date) => {
      const today = new Date();
      const date18YearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
      );
      return date <= date18YearsAgo;
    }, 'You must be older than 18 to use this site.'),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export default SignupSchema;
