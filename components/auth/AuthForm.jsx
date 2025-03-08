"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { BiSolidLock } from "react-icons/bi";
import { MdEmail, MdPerson } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

const AuthForm = ({ schema, defaultValues, formType, onSubmit }) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // 2. Define a submit handler.
  const handleSubmit = async (data) => {
    const result = await onSubmit(data);

    if (result?.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });

      // Force NextAuth to refresh session
      const newSession = await getSession(); // Fetch new session data
      console.log("New Session:", newSession); // Debugging

      router.refresh(); // Refresh the page

      router.push(routes.HOME);
    } else {
      toast({
        title: `Error ${result?.status}`,
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  const iconMap = {
    email: <MdEmail className="pointer-events-none absolute ml-3 size-5" />,
    password: (
      <BiSolidLock className="pointer-events-none absolute ml-3 size-5" />
    ),
    username: <MdPerson className="pointer-events-none absolute ml-3 size-5" />,
    name: <MdPerson className="pointer-events-none absolute ml-3 size-5" />,
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-wrap justify-center space-y-8"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem className="flex w-full flex-wrap justify-center">
                <FormControl className="w-full">
                  <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
                    {iconMap[field.name]}
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      placeholder={`${field.name
                        .charAt(0)
                        .toUpperCase()}${field.name.slice(1)}`}
                      {...field}
                      className="rounded-2xl border-none py-2 pl-10 pr-3 font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-xs placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500 lg:placeholder:text-sm xl:placeholder:text-base"
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
          className="btn-template w-full bg-orange-500 text-xs hover:bg-orange-600 lg:text-sm xl:text-base"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signin In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p className="w-full">
            Don&apos;t have an account?{" "}
            <Link
              href={routes.SIGN_UP}
              className="font-bold text-orange-500 transition-all duration-200 ease-in-out hover:text-orange-600"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="w-full">
            Already have an account?{" "}
            <Link
              href={routes.SIGN_IN}
              className="font-bold text-orange-500 transition-all duration-200 ease-in-out hover:text-orange-600"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
