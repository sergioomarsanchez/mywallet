// src/components/AccDrawer.tsx
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
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { getMonthlyMovements } from "@/lib/actions";
import AccChart from "./accChart";

interface AccDrawerProps {
  accountId: string;
}

export const AccChartDrawer: React.FC<AccDrawerProps> = ({ accountId }) => {
  const [monthlyData, setMonthlyData] = React.useState<
    { month: string; income: number; expense: number }[]
  >([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getMonthlyMovements(accountId);
      setMonthlyData(data);
    }

    fetchData();
  }, [accountId]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <ChartBarIcon
            className="font-bold size-5 text-white hover:text-blue-400"
            style={{
              filter: "drop-shadow(2px 2px 4px #ffffff)",
            }}
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
          <div className="p-4 my-4">
            <AccChart data={monthlyData} />
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
