import React from "react";
import AccOverviewCard from "./accOverviewCard";
import type { OverviewData } from "src/app/types/front";

interface UserOverviewProps {
  overviewData: OverviewData[];
}

const UserOverview: React.FC<UserOverviewProps> = ({ overviewData }) => {
  return (
    <div className="lg:grid flex flex-col justify-center items-center lg:gap-10 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:p-5 rounded-lg">
      {overviewData.map((data, index) => (
        <AccOverviewCard key={index} data={data} />
      ))}
    </div>
  );
};

export default UserOverview;
