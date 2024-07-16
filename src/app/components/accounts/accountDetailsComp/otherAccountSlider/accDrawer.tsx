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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Account } from "src/app/types/back";
import AccCard from "./accCard";

export function AccDrawer({ accounts }: { accounts: Account[] }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <BanknotesIcon
            className="font-bold size-5 text-white hover:text-blue-400"
            style={{
              filter: "drop-shadow(2px 2px 4px #ffffff)",
            }}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center bg-opacity-85 bg-gray-200 dark:bg-black">
        <div className="w-full">
          <DrawerHeader className="flex flex-col justify-center items-center gap-2">
            <DrawerTitle>Your other Accounts</DrawerTitle>
            <DrawerDescription className="font-thin">
              Check your other accounts
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 my-4">
            <div className="flex items-center justify-center">
              <Carousel
                opts={{
                  align: "center",
                }}
                className="max-w-[80%]"
              >
                <CarouselContent>
                  {accounts.map((account) => (
                    <CarouselItem
                      key={account.id}
                      className="sm:basis-1 md:basis-1/2"
                    >
                      <AccCard account={account} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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
}
