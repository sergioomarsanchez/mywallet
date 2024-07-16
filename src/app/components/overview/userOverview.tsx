import React from "react";
import AccOverviewCard from "./accOverviewCard";
import type { OverviewData } from "src/app/types/front";

interface UserOverviewProps {
  overviewData: OverviewData[];
}

const UserOverview: React.FC<UserOverviewProps> = ({ overviewData }) => {
  return (
    <div className="lg:grid flex flex-col justify-center items-center lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {overviewData.map((data, index) => (
        <AccOverviewCard key={index} data={data} />
      ))}
    </div>
  );
};

export default UserOverview;
