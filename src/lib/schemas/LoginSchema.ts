import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(8, 'Your password must be longer than 3 charcters. ')
    .max(22, 'Your password may not be longer than 22 characters.'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default LoginSchema;
