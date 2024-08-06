import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ClockIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { LatestTransaction } from "@/lib/actions";
import TransactionsContainer from "./latestTransactionsContainer";

interface AccDrawerProps {
  creditTransactions: LatestTransaction[];
  debitTransactions: LatestTransaction[];
}

export const LastTransactionsDrawer: React.FC<AccDrawerProps> = ({
  creditTransactions,
  debitTransactions,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="relative">
          <ClockIcon
            className="font-bold size-10 text-white hover:text-blue-400"
            style={{
              filter: "drop-shadow(2px 2px 4px #ffffff)",
            }}
          />
          <ArrowsRightLeftIcon
            className="absolute -bottom-1 -left-1 size-6 z-10 p-1 text-white bg-black/95 dark:bg-blue-500/90 rounded-full hover:text-blue-400"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center bg-opacity-85 bg-gray-200 dark:bg-black">
        <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%]">
          <DrawerHeader className="flex flex-col justify-center items-center gap-2">
            <DrawerTitle>Monthly Movements</DrawerTitle>
            <DrawerDescription className="font-thin">
              Income and Expenses over the last year
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex max-h-[50vh] overflow-y-scroll flex-col md:flex-row gap-2 md:gap-10 w-full justify-start md:pt-5">
            <div className="md:w-1/2 pb-4 md:pb-12 lg:pb-4">
              <TransactionsContainer
                title="Latest Credit Transactions"
                transactions={creditTransactions}
              />
            </div>
            <div className="md:w-1/2 md:pb-12 lg:pb-4">
              <TransactionsContainer
                title="Latest Debit Transactions"
                transactions={debitTransactions}
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
