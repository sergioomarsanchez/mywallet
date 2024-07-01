import { updateUserRole } from "@/lib/actions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { UserRole } from "@prisma/client";
import { useToast } from "src/app/context/ToastContext";
import { useOptimistic } from "react";

export default function RoleDropdown({
  role,
  userId,
}: {
  userId: string;
  role: string;
}) {
  const { addToast } = useToast();
  const [optimisticRole, setOptimisticRole] = useOptimistic(role);

  const handleRoleChange = async (roleType: UserRole) => {
    const previousRole = optimisticRole;
    setOptimisticRole(roleType);

    try {
      await updateUserRole(userId, roleType);
      addToast(`User's role updated successfully`, "success");
    } catch (error) {
      setOptimisticRole(previousRole);
      addToast(`Error updating User's role`, "error");
    }
  };

  return (
    <div className="min-w-fit text-right">
      <Menu>
        <MenuButton
          className={`inline-flex items-center min-w-20 rounded-md bg-gray-800 py-0.5 px-3 text-sm/6 font-medium shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white ${
            optimisticRole === "Admin"
              ? "italic font-thin text-red-800 dark:text-red-200"
              : "text-slate-800 dark:text-slate-100"
          }`}
        >
          {optimisticRole}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="min-w-20 origin-top-right rounded-xl border border-white/5 bg-gray-400 dark:bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              onClick={() => handleRoleChange("Admin")}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              Admin
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => handleRoleChange("User")}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              User
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
