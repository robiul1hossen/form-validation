import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { Button } from "./components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),

  password: z
    .string()
    .min(6, "minimum 6 character at least")
    .max(10, "password must be in 10 character"),

  terms: z.boolean().refine((value) => value === true, {
    message: "Please check the box to proceed",
  }),

  age: z
    .number({ message: "Only number Accepted" })
    .int("age can't be a fraction")
    .min(18, "age can't be under 18")
    .max(100, "age can't be over 100"),

  description: z
    .string({ message: "description can't be empty" })
    .min(20, "Write at least 20 character")
    .max(200, "type within 200 character"),

  language: z
    .string()
    .refine(
      (val) =>
        ["JavaScript", "TypeScript", "Java", "C", "C++", "Python"].includes(
          val,
        ),
      { message: "Must select a language" },
    ),
  avatar: z
    .instanceof(FileList)
    .refine((f) => f.length > 0, "File বেছে নাও")
    .refine((f) => f[0]?.size <= MAX_SIZE, "ফাইল ৫MB-এর বেশি না")
    .refine((f) => ALLOWED.includes(f[0]?.type), "শুধু JPG, PNG, WEBP চলবে"),
});

const languages = ["JavaScript", "TypeScript", "Java", "C", "C++", "Python"];

export default function Form1() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
      age: 0,
      description: "",
      language: "",
    },
  });
  const termsValue = form.watch("terms");

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full mx-auto bg-white py-10 px-16 shadow rounded-lg mt-20">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Type Your Name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.email}>Email</FieldLabel>
              <Input
                {...field}
                id={field.email}
                type="email"
                placeholder="Type Your Email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.password}>Password</FieldLabel>
              <Input
                {...field}
                type="password"
                id={field.password}
                placeholder="******"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.age}>Age</FieldLabel>
              <Input
                id={field.age}
                type="number"
                placeholder="Enter Your Age"
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field htmlFor={field.description}>
              <FieldLabel>Description</FieldLabel>
              <Textarea {...field} type="text" placeholder="Describe Here" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="language"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Select Your Language</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Your Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {languages.map((lan, i) => (
                      <SelectItem key={i} value={lan}>
                        {lan}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel>Terms & Conditions </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="avatar"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Avatar</FieldLabel>
              <Input
                type="file"
                ref={field.ref}
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => field.onChange(e.target.files)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button disabled={!termsValue} className="mt-5 " type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
