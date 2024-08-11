import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function TransActionDropdown({
  setOpenDeleteWarningModal,
  setOpenEditTransactionModal,
}: {
  setOpenDeleteWarningModal: (prev: boolean) => void;
  setOpenEditTransactionModal: (prev: boolean) => void;
}) {
  return (
    <>
      <Menu>
        <MenuButton className="inline-flex items-center rounded-md py-0.5 px-1 text-sm/6 font-medium shadow-inner focus:outline-none text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white">
          <EllipsisVerticalIcon className="size-4 fill-white/60" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="min-w-20 origin-top-right rounded-xl border border-white/5 bg-gray-400 dark:bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              onClick={() => setOpenDeleteWarningModal(true)}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <TrashIcon className="size-4 text-red-500" />
              Delete
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setOpenEditTransactionModal(true)}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <PencilIcon className="size-4 text-white" />
              Edit
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
