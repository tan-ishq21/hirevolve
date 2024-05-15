// src/utils/formSchema.js
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  education: z.string().min(1, { message: "Education is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  linkedin: z.string().url({ message: "Invalid URL" }),
  resume: z.instanceof(File).refine(file => file.type === "application/pdf", {
    message: "Only PDF files are accepted"
  })
});
