import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { schema } from "./schema/userFormSchema";

export default function Form2() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      password: "",
      gender: "",
      terms: false,
      country: "",
    },
  });

  const genders = ["male", "female", "other"];
  const countries = ["bangladesh", "pakistan", "china", "iran", "palestine"];

  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full mx-auto bg-white py-10 px-16 shadow rounded-lg mt-20">
      <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...field} type="text" placeholder="Type Your Name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="Enter Your Email Address"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="relative">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-10 right-4"
          >
            {showPassword ? (
              <EyeOff size={18} className="cursor-pointer" />
            ) : (
              <EyeIcon size={18} className="cursor-pointer" />
            )}
          </button>
        </div>

        <Controller
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Age</FieldLabel>
              <Input
                type="number"
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                placeholder="Enter Your Age"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <FieldLabel>Gender</FieldLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Select>
          )}
        />

        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldGroup className="">
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel>Accept terms and conditions</FieldLabel>
              </Field>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldGroup>
          )}
        />

        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="w-fit"
            >
              <FieldLabel>Select Your Country</FieldLabel>
              {countries.map((country) => (
                <div key={country} className="flex items-center gap-3">
                  <RadioGroupItem value={country} id={country} />
                  <Label htmlFor={country}>{country}</Label>
                </div>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </RadioGroup>
          )}
        />

        <Controller
          name="photo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Photo</FieldLabel>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={field.ref}
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
}
