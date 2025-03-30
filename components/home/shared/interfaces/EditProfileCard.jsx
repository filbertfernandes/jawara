import { zodResolver } from "@hookform/resolvers/zod";
import multiavatar from "@multiavatar/multiavatar/esm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/user.action";
import { EditProfileSchema } from "@/lib/validations";

const EditProfileCard = ({ onClose, isVisible, onUpdate, user, setUser }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, username: user.username });
    }
  }, [user, form]);

  const onSubmit = async (data) => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const res = await updateUser(user._id, data);
      if (res.success) {
        setUser(res.data);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        onClose();
      } else {
        console.error("Update failed:", res.error);
        toast({
          title: "Update Failed",
          description:
            res.error?.message || "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description:
          error?.message || "Something went wrong while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 flex size-full items-center justify-center">
      <div
        className={`relative flex w-[400px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl ${
          isVisible ? "animate-bounceIn" : "opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          <IoMdCloseCircle size={24} />
        </button>

        <div className="flex items-center gap-4 border-b pb-4">
          <div className="relative flex size-20">
            <div
              className="flex size-full"
              dangerouslySetInnerHTML={{ __html: multiavatar(user?._id) }}
            />
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity hover:opacity-100">
              <FaEdit size={24} className="text-gray-100" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Profile
            </h2>
            <p className="text-sm text-gray-600">Update your informations</p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="group">
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="mt-1 w-full rounded-2xl border-none px-3 py-2 font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-xs placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500"
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="group">
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="mt-1 w-full rounded-2xl border-none px-3 py-2 font-semibold text-gray-900 ring-2 ring-gray-300 placeholder:text-xs placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500"
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-template bg-orange-500 px-4 py-2 text-gray-100 shadow-md hover:bg-orange-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Apply"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileCard;
