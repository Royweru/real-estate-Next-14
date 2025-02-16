"use client";
import React, { useTransition, useEffect, useState } from "react";
import { verifyEmail } from "@/actions/verify-email";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { ErrorMessage } from "./error";
import { Success } from "./success";

export const NewVerificationForm = ({ verificationToken }: { verificationToken: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState<string | undefined>("");
  const [isErr, setIsErr] = useState<string | undefined>("");

  useEffect(() => {
    if (!verificationToken) {
      setIsErr("You are missing a verification token");
      return;
    }

    const handleVerification = async () => {
      try {
        startTransition(() => {
          verifyEmail(verificationToken)
            .then((res) => {
              if (res?.error) {
                setIsErr(res.error);
                setIsSuccess("");
              } else {
                setIsSuccess(res?.success);
                setIsErr("");
              }
            })
            .catch((err) => {
              setIsErr("Verification failed. Please try again.");
              console.error(err);
            });
        });
      } catch (error) {
        setIsErr("An unexpected error occurred.");
        console.error(error);
      }
    };

    handleVerification();
  }, [verificationToken]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div
        className="p-8 bg-neutral-100/95 rounded-md shadow-md 
        flex flex-col gap-y-4 md:max-w-[650px] items-center justify-center"
      >
        <h4 className="text-xl tracking-wide font-semibold text-neutral-900">
          Verifying token...
        </h4>

        {isPending && !isErr && <BeatLoader className="animate-pulse text-sky-500" />}
        <ErrorMessage message={isErr} />
        <Success message={isSuccess} />

        {isSuccess && !isPending && (
          <div className="w-full text-center font-semibold">
            <Button variant="link" className="w-full text-black">
              <Link href="/">Go to Home page</Link>
            </Button>
            <Button variant="link" className="w-full">
              <Link href="/listing/new">Create new listing</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
