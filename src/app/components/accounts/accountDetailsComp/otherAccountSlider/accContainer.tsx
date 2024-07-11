import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Account } from "src/app/types/back";
import AccCard from "./accCard";

function AccContainer({ accounts }: { accounts: Account[] }) {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <h3 className="text-xs font-thin space-x-4">Your other Accounts</h3>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[90%] max-w-[20rem]"
      >
        <CarouselContent>
          {accounts.map((account) => (
            <CarouselItem key={account.id} className="md:basis-1/2">
              <AccCard account={account} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default AccContainer;
