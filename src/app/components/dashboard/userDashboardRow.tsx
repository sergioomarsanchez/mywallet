"use client";
import React, { useState } from "react";
import { User } from "../../types/back";
import Loader from "../loader";
import ProfileIcon from "../../assets/icons/profile-icon";
import DeleteUserWarningModal from "./deleteUserWarningModal";
import { boolean } from "zod";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function UserDashboardRow({ user }: { user: User }) {
  if (!user)
    return (
      <div>
        <Loader />
      </div>
    );

  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const createdAt = user?.createdAt;
  const createdMonth = createdAt ? months[createdAt.getMonth()] : null;
  const createdDay = createdAt ? createdAt.getDate() : null;
  const updatedAt = user?.updatedAt;
  const updatedMonth = updatedAt ? months[updatedAt.getMonth()] : null;
  const updatedDay = updatedAt ? updatedAt.getDate() : null;
  return (
    <>
      <tbody className="text-xs lg:text-base">
        <tr className="bg-gray-900/30 group">
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="flex items-center justify-start mb-2 sm:mb-0 gap-2">
              {user?.avatar ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.avatar}
                  width={32}
                  height={32}
                  alt="User"
                />
              ) : (
                <ProfileIcon className="size-8 rounded-full" />
              )}
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-left truncate">
                {user.firstName + " " + user.lastName}
              </h2>
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div>{user.email}</div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
            <div
              className={`font-medium text-slate-800 dark:text-slate-100 ${
                user.role === "Admin"
                  ? "italic font-thin text-red-800 dark:text-red-200"
                  : ""
              }`}
            >
              {user.role}
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="flex items-center gap-2 text-left font-medium">
              {createdAt ? `${createdMonth}-${createdDay}` : "-"}
            </div>
          </td>
          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="flex items-center gap-2 text-left font-medium">
              {updatedAt ? `${updatedMonth}-${updatedDay}` : "-"}
            </div>
          </td>
          <td className="px-1 first:pl-5 last:pr-5 py-0.5 flex items-center justify-center">
            <DeleteUserWarningModal
              userId={user.id}
              openWarningModal={openWarningModal}
              setOpenWarningModal={setOpenWarningModal}
            />
            {/*<div className="text-left flex gap-1 justify-center items-center">
               <div className="group-hover:flex hidden">
                <button
                  className={`flex items-center justify-between w-full  cursor-pointer`}
                  onClick={() => setEditModalOpen(true)}
                >
                  <EditIcon className="m-0 h-7 w-7 fill-current dark:hover:text-slate-100 hover:scale-105 transition-all duration-100" />{" "}
                </button>
                <button
                  className={`flex items-center justify-between w-full  cursor-pointer`}
                  onClick={() => setDangerModalOpen(true)}
                >
                  <DeleteIcon className="m-0 h-7 w-7 dark:hover:text-rose-600 fill-current hover:scale-105 transition-all duration-100" />
                </button>
                <button
                  className={`flex items-center justify-between w-full  cursor-pointer`}
                  onClick={() => handleArchive()}
                >
                  {project.archived ? "Unarchived" : "Archive"}
                </button>
              </div>
              <ModalBasic
                isOpen={editModalOpen}
                setIsOpen={setEditModalOpen}
                title={`Edit Project: ${
                  project.name + " [" + project.clientName + "]"
                }`}
              >
                <EditProjectForm
                  project={project}
                  setEditModalOpen={setEditModalOpen}
                />
              </ModalBasic>

              <ModalBlank
                isOpen={dangerModalOpen}
                setIsOpen={setDangerModalOpen}
              >
                <DeleteWarning
                  projectId={project.id}
                  setDangerModalOpen={setDangerModalOpen}
                />
              </ModalBlank>

            </div> */}
          </td>
        </tr>
      </tbody>
    </>
  );
}
