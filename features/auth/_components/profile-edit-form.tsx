/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { UserSchema, UserSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { ProfileImageUpload } from "./profile-image-upload";
import { RemoveProfileImage } from "@/actions/remove-profile-image";
import { toast } from "sonner";
export const ProfileEditForm = ({ user }: { user: User }) => {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      imageUrl: user.image || undefined,
      role: user.role || undefined,
      hashedPwd: user.hashedPwd || undefined,
    },
  });
  const onSubmit = (vals: UserSchemaType) => {
    console.log(vals);
  };
  const onRemoveProfileImage = async()=>{
    const res = await RemoveProfileImage(user.id)
    if(res){
      toast.success("Profile Image removed successfully")
    }else{
      toast.error("Something went wrong while trying to remove profile image")
    }
  }
  return (
    <div className="relative w-full h-full flex flex-col gap-y-5">
      <Card>
        <CardHeader>
          <CardTitle className=" text-xl font-bold text-stone-800/90">
            User Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative w-full grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold text-neutral-800/90">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Profile Name .."
                          className="w-full relative"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="imageUrl"
                  control={form.control}
                  render={({ field }) => (
                    <div className=" relative w-full flex items-center justify-center gap-x-2">
                      <div className="relative w-full group flex flex-col items-center justify-center">
                        <Avatar className=" size-24 relative">
                          <AvatarImage src={field.value} />
                          <AvatarFallback className="text-xl font-bold text-neutral-800/90">
                            {user.name?.charAt(0).toUpperCase()}
                            {user.name?.charAt(1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="relative w-full flex flex-col items-center justify-center gap-y-2">
                        <h5 className="text-md font-semibold text-zinc-750/95">
                          This is your profile image
                        </h5>
                        <p className="text-xs font-semibold text-zinc-750/95">
                          Change your profile image
                        </p>
                        <ProfileImageUpload
                          onChange={(url: string) => field.onChange(url)}
                          onRemove={onRemoveProfileImage}
                        />
                      </div>
                    </div>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
