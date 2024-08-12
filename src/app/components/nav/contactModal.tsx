"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Description,
} from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactData } from "src/app/types/front";
import clsx from "clsx";
import Loader from "../loader";
import { sendContactMessage } from "@/lib/actions";
import { useToast } from "src/app/context/ToastContext";

type ContactModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ContactModal({ open, setOpen }: ContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContactData) => {
    setIsLoading(true);
    try {
      await sendContactMessage(data);
      addToast("Your message has been sent. Thank you!", "success");
      setOpen(false);
      reset();
    } catch (error) {
      addToast("Failed to send your message. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        Contact Us
      </span>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md text-center rounded-xl bg-gradient-to-br shadow-lg from-slate-300 to-slate-400 dark:from-slate-800 dark:to-slate-950 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-lg font-bold justify-center flex"
            >
              Contact Us
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-gray-600 dark:text-gray-300">
              Please fill out the form below to send us a message.
            </Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5 w-full pb-10"
            >
              <Field className="text-left w-full">
                <Label className="text-sm/6 font-medium">Name:</Label>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Your Name"
                  required
                  className={clsx(
                    "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
              <div className="h-4 mb-2">
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <Field className="text-left w-full">
                <Label className="text-sm/6 font-medium">Email:</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  required
                  className={clsx(
                    "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
              <div className="h-4 mb-2">
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <Field className="text-left w-full">
                <Label className="text-sm/6 font-medium">Message:</Label>
                <textarea
                  {...register("message")}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className={clsx(
                    "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
              <div className="flex w-full justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  type="button"
                  className="w-full rounded-lg bg-red-600 dark:bg-red-800 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-red-700 sm:col-span-2 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full rounded-lg bg-blue-600 dark:bg-blue-800 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-blue-700 sm:col-span-2 sm:text-sm"
                >
                  {isLoading ? <Loader /> : "Send"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
