import z from "zod";

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export const schema = z.object({
  name: z.string().min(6, "Name Is Required"),
  email: z.email().min(8, "Email is required with minimum length 8 character"),
  age: z
    .number({ message: "age must be a number" })
    .int({ message: "Age cannot be a fraction" })
    .min(18, "Age should be equal or grater than 18")
    .max(99, "age cannot over 99 years"),
  password: z.string().min(8, "Password must be more than 7 character"),
  gender: z
    .string()
    .refine((value) => ["male", "female", "other"].includes(value), {
      message: "Gender selection is required",
    }),
  country: z
    .string()
    .refine(
      (value) =>
        ["bangladesh", "pakistan", "china", "iran", "palestine"].includes(
          value,
        ),
      {
        message: "Country is required",
      },
    ),
  terms: z.boolean().refine((value) => value === true, {
    message: "Please check to proceed",
  }),
  photo: z
    .instanceof(FileList)
    .refine((file) => file.length > 0, {
      message: "Select a file",
    })
    .refine(
      (file) => file[0]?.size <= MAX_SIZE,
      "File size cannot be more than 2 mb",
    )
    .refine((file) =>
      ALLOWED.includes(file[0]?.type, "Select accepted type only"),
    ),
});
