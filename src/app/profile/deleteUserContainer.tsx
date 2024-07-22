"use client";
import DeleteUserWarningModal from "@/components/dashboard/deleteUserWarningModal";
import React, { useState } from "react";

function DeleteUserContainer({ userId }: { userId: string }) {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);
  return (
    <div className="ml-2">
      <DeleteUserWarningModal
        userId={userId}
        openWarningModal={openWarningModal}
        setOpenWarningModal={setOpenWarningModal}
      />
    </div>
  );
}

export default DeleteUserContainer;
