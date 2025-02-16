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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema, UserSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AwardIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { ProfileImageUpload } from "./profile-image-upload";
import { RemoveProfileImage } from "@/actions/remove-profile-image";
import axios from "axios";
import { toast } from "sonner";
import { ChangePassword } from "@/actions/change-password";
import { logout } from "@/actions/logout";
import { uploadProfileImage } from "@/actions/upload-profile-image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirm } from "@/hooks/use-confirm";
import { generateToken } from "@/lib/generateToken";
import { sendVerificationEmail } from "@/lib/mail";
export const ProfileEditForm = ({ user }: { user: User }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [ConfirmDialog,confirm] = useConfirm("Delete user",
    "Deleting this account means deleting everything associated witn this account")
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isVeryfingEmail,setIsVeryfingEmail] = useState<boolean>(false);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      imageUrl: user.image || undefined,
      role: user.role || undefined,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onChangePassword = async () => {
    const vals = form.getValues();
    if (!vals.newPassword || !vals.newPassword)
      return toast.error("Missing fields !");
    if (vals.newPassword !== vals.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    setIsChangingPassword(true);
    const res = await ChangePassword(user.id, vals.newPassword);
    if (res) {
      toast.success("Password changed successfully");
    } else {
      toast.error("Something went wrong while trying to change password");
    }
    setIsChangingPassword(false);
  };
  const deleteUser = async (userId: string) => {
    try {
      const ok = await confirm()
      if(!ok) return
      const res = await axios.delete(`/api/auth/delete/${userId}`);
      if (res.status === 200) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Something went wrong while trying to delete user");
      }
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong while trying to delete user");
    }
  };
  const onRemoveProfileImage = async () => {
    const res = await RemoveProfileImage(user.id);
    if (res) {
      toast.success("Profile Image removed successfully");
    } else {
      toast.error("Something went wrong while trying to remove profile image");
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev: boolean) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev: boolean) => !prev);
  };
  const onUpdateProfile = async () => {
    const vals = form.getValues();
    if (!vals.imageUrl) return;
    setIsImageUploading(true);
    const res = await uploadProfileImage(user.id, vals.imageUrl);
    if (res) {
      toast.success(
        "Profile Image updated successfully,will be visible after refresh",
        {
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }
      );
    } else {
      toast.error("Something went wrong while trying to update profile image");
    }
    setIsImageUploading(false);
  };
  const onVerifyEmail = async()=>{
    try {
      setIsVeryfingEmail(true)
      if(!user.email) return
      const verificationToken = await generateToken(user.email)
      await sendVerificationEmail(verificationToken.email,verificationToken.token)
      return toast.success("Check your email inbox,we have sent you a link to verify your email",{
        style:{
         background:"green",
         color:"whitesmoke",
        }
      })
    } catch (error) {
       console.error(error)
       toast.error("Oopsy something went wrong while trying to verify your email !")
    }finally{
     setIsVeryfingEmail(false)
    }
   
  }
  return (
    <>
    <ConfirmDialog />
      <Form {...form}>
        <form>
          <div className="relative w-full h-full flex flex-col gap-y-5">
            <Card>
              <CardHeader>
                <CardTitle className=" text-xl font-bold text-stone-800/90">
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6"></CardContent>
              <CardContent>
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
                      <div className=" relative w-full flex items-center justify-center gap-x-1">
                        <div className="relative group">
                          <Avatar
                            className={cn(
                              "size-32 border-slate-200 border-2 bg-gradient-to-br from-purple-100 to-purple-200 text-white",
                              isImageUploading &&
                                "opacity-50 pointer-events-none"
                            )}
                          >
                            <AvatarImage
                              src={
                                form.watch("imageUrl") ||
                                user.image ||
                                undefined
                              }
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br  text-xl font-bold text-white">
                              {user.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                            <div className=" absolute left-5 bottom-10 opacity-0 group-hover:opacity-100 ease-in-out duration-300 flex items-center justify-center gap-x-1 bg-black/50 rounded-full p-2">
                              <ProfileImageUpload
                                onChange={(url) => {
                                  if (user.image && user.image !== url) {
                                    onRemoveProfileImage();
                                  }
                                  if (url) {
                                    form.setValue("imageUrl", url);
                                    onUpdateProfile();
                                  }
                                }}
                              />
                              {user.image && (
                                <Button
                                  variant={"ghost"}
                                  type="button"
                                  className="p-2 rounded-full"
                                  onClick={onRemoveProfileImage}
                                >
                                  <Trash2Icon className="size-8 font-bold text-red-400 " />
                                </Button>
                              )}
                            </div>
                          </Avatar>
                        </div>

                        <div className="text-center space-y-1.5">
                          <h3 className="font-semibold text-lg text-gray-900">
                            Profile Picture
                          </h3>
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                      </div>
                    )}
                  />
                  <div className=" relative w-full flex flex-col justify-center gap-y-2">
                    {!user.emailVerified && (
                      <Button 
                      variant={"link"}
                      type="button"
                      disabled={isVeryfingEmail}
                      className=" bg-rose-100"
                      onClick={onVerifyEmail}
                      >
                        <p className="text-sm font-light text-neutral-900/95">
                          Verify your email address !
                        </p>
                      </Button>
                    )}
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold text-neutral-800/90">
                            Email address
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
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className=" text-xl font-bold text-stone-800/90">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" flex flex-col gap-y-2">
                  <div className="relative w-full grid grid-cols-2 gap-x-4 gap-y-2">
                    <FormField
                      name="newPassword"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-sm italic font-normal text-neutral-750/95">
                              New Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full ">
                                <Input
                                  placeholder="New Password"
                                  type={isPasswordVisible ? "text" : "password"}
                                  className="w-full relative"
                                  {...field}
                                />
                                <Button
                                  variant={"outline"}
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute right-0 top-0"
                                >
                                  <EyeIcon className="size-4" />
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      name="confirmPassword"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className="text-sm italic font-normal text-neutral-750/95">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full ">
                                <Input
                                  placeholder="Confirm Password"
                                  type={
                                    isConfirmPasswordVisible
                                      ? "text"
                                      : "password"
                                  }
                                  className="w-full relative"
                                  {...field}
                                />
                                <Button
                                  variant={"outline"}
                                  type="button"
                                  onClick={toggleConfirmPasswordVisibility}
                                  className="absolute right-0 top-0"
                                >
                                  <EyeIcon className="size-4" />
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className=" w-full flex justify-end items-center mt-4">
                    <Button
                      variant={"outline"}
                      className=" font-semibold flex items-center justify-center gap-x-2"
                      type="button"
                      onClick={onChangePassword}
                      disabled={isChangingPassword}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-500/10">
              <CardHeader>
                <CardTitle className=" text-xl font-bold text-stone-800/90">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant={"destructive"}
                  type="button"
                  className="font-bold flex items-center justify-center gap-x-2  "
                  //  Have a confirmation dialog
                  onClick={()=>deleteUser(user.id)}
                >
                  <Trash2Icon className="size-7" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
};
