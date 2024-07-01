import React from "react";
import type { User } from "../../types/back";
import UserDashboardRow from "./userDashboardRow";

function UsersDashboard({ users }: { users: User[] }) {
  return (
    <div className="shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="flex justify-between items-center px-5 py-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Users{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {users.length}
          </span>
        </h2>
        <div className="flex justify-center items-center gap-2">
          {/* 
          <div className="m-1.5">
            <button
              className="flex justify-center items-center border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit text-sm lg:text-base rounded-sm border bg-gray-200 dark:bg-[#3C754F]/30 hover:dark:bg-[#3C754F]/90 hover:scale-[101%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 p-1 lg:pr-3"
                 onClick={() => setAddProject(!addProject)}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden md:block ml-2">Add User</span>
            </button>
            <ModalBasic
              isOpen={addProject}
              setIsOpen={setAddProject}
              title="Add Project"
            >
              <AddProjectForm setAddProject={setAddProject} />
            </ModalBasic>
          </div> */}
        </div>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto lg:w-full dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Created Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Updated Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {users?.map((user) => (
              <UserDashboardRow user={user} key={user.id} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersDashboard;
