"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

import { MdEmail, MdPerson } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";

const AuthForm = ({ schema, defaultValues, formType, onSubmit }) => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  // 2. Define a submit handler.
  const handleSubmit = async () => {
    // TODO: Authenticate User
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  const iconMap = {
    ["email"]: (
      <MdEmail className="w-5 h-5 absolute ml-3 pointer-events-none" />
    ),
    ["password"]: (
      <BiSolidLock className="w-5 h-5 absolute ml-3 pointer-events-none" />
    ),
    ["username"]: (
      <MdPerson className="w-5 h-5 absolute ml-3 pointer-events-none" />
    ),
    ["name"]: (
      <MdPerson className="w-5 h-5 absolute ml-3 pointer-events-none" />
    ),
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 flex flex-wrap justify-center"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem className="flex flex-wrap justify-center mt-10 w-full">
                <FormControl className="w-[50%]">
                  <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
                    {iconMap[field.name]}
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      placeholder="Email"
                      {...field}
                      className="pr-3 pl-10 py-2 font-semibold placeholder:text-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="btn-template w-[50%] bg-orange-500 text-base hover:bg-orange-600"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signin In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p className="w-full">
            Don't have an account?{" "}
            <Link href={ROUTES.SIGN_UP} className="text-orange-500 font-bold">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="w-full">
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN} className="text-orange-500 font-bold">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
