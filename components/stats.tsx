import React from "react";

interface StatsProps {
  statName: string;
  statValue: any;
}

const Stats: React.FC<StatsProps> = ({ statName, statValue }) => {
  return (
    <div className="p-4 truncate sm:whitespace-normal hidden md:block">
      <dt className="text-blueGray-600 text-xl font-bold">{statName}</dt>
      <dd className="mt-3 text-blue-400 font-semibold text-2xl">{statValue}</dd>
    </div>
  );
};

export default Stats;
