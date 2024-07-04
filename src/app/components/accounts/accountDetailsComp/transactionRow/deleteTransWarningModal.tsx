"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Loader from "@/components/loader";
import React from "react";
import { useToast } from "src/app/context/ToastContext";
import { deleteAccount, deleteTransaction } from "@/lib/actions";
import { Type } from "@prisma/client";

export default function DeleteTransactionWarningModal({
  transactionId,
  accountId,
  amount,
  type,
  openWarningModal,
  setOpenWarningModal,
}: {
  transactionId: string;
  accountId: string;
  amount:number;
  type:Type;
  openWarningModal: boolean;
  setOpenWarningModal: (openSigninModal: boolean) => void;
}) {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTransaction(transactionId, accountId, amount, type);
      addToast("Transaction deleted successfully,", "success");
      setOpenWarningModal(false);
    } catch (err) {
      addToast("Failed delete transaction. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handelClose = () => {
    setOpenWarningModal(false);
  };

  return (
    <>
      <Dialog
        open={openWarningModal}
        onClose={() => setOpenWarningModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/10">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium dark:text-gray-200 justify-center flex"
            >
              Delete Transaction?
            </DialogTitle>
            <main className="flex flex-col gap-1 justify-center items-center mt-5">
              <div className="py-2 md:py-5 border-y-[1px] border-y-red-500/60 dark:border-y-red-400/30 flex items-center justify-center w-[90%]">
                <p className="text-xs lg:text-sm">
                  Are you sure that you want to delete this transaction? This action
                  is irreversible and will permanently change the balance of the account.
                </p>
              </div>
            </main>
            <div className="mt-5 flex gap-10 justify-center items-center mb-5">
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handelClose}
                  className="rounded-md bg-gray-500/30 hover:bg-gray-500/70 py-1 px-2 text-sm font-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={onConfirmDelete}
                  className="rounded-md bg-red-500/30 hover:bg-red-500/70 py-1 px-2 text-sm font-sm text-white/70 hover:text-white transition-colors duration-200 min-w-28"
                >
                  {isLoading ? (
                    <div className="w-fit flex justify-center items-center gap-2">
                      <Loader /> <span>Deleting...</span>
                    </div>
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
