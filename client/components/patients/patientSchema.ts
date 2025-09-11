import { z } from "zod";

export const patientSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  age: z.coerce.number().int().min(1).max(120),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  contact: z.string().min(7).max(20),
  email: z.string().email(),
  weight: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  bmi: z.coerce.number().positive(),
  conditions: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
  routine: z.string().min(1, "Daily Routine is required"),
  sleepHours: z.coerce.number().min(0).max(24),
  activity: z.enum(["Low", "Medium", "High"], { required_error: "Select activity" }),
  dosha: z.enum(["Vata", "Pitta", "Kapha", "Mixed"], { required_error: "Select dosha" }),
  foodPref: z.enum(["Vegetarian", "Vegan", "Non-Vegetarian"], { required_error: "Select food preference" }),
  restrictions: z.string().optional().default(""),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
