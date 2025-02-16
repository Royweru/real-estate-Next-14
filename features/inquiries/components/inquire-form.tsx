import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

export const InquireForm = ({
  listingId,
}: {
  listingId: string | undefined;
}) => {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const onSubmit = async () => {
    setIsLoading(false)
    if (!email) return toast.error("Missing fields");
    if (!name) return toast.error("Missing fields");
    if (!listingId) return toast.error("Require the listing Id");
    try {
      const res = await axios.post("/api/inquiries/create", {
        name,
        email,
        phoneNo,
        message,
        listingId,
      });
      if (res.status === 201) {
        setEmail("");
        setPhoneNo("");
        setMessage("");
        setName("");
        toast.success("Inquiry submitted successfully !",{
          style:{
            background:"green",
            color:"white"
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Ooopsy something went wrong!!");
    } finally{
      setIsLoading(false)
    }
  };
  return (
    <div className=" relative grid  gap-3 lg:gap-4 p-2 md:p-4 rounded-md bg-slate-100/70 shadow-sm">
      <div className=" space-y-1.5 ">
        <Label className=" font-semibold">Name (*)</Label>
        <Input
          placeholder="John doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className=" space-y-1.5">
        <Label className=" font-semibold">Email (*)</Label>
        <Input
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className=" space-y-1.5">
        <Label className=" font-semibold">Phone number</Label>
        <Input
          placeholder="+254 759 354 299"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>

      <div className=" space-y-1.5 ">
        <Label className=" font-semibold">Message</Label>
        <Textarea
          className=" min-h-14 font-mono text-neutral-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className=" relative">
        <Button
          className="w-full font-semibold"
          variant={"outline"}
          onClick={onSubmit}
          disabled={isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
