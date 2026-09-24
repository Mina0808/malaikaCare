import React from "react";

interface StatsProps {
  statValue: any;
}

const Stats: React.FC<StatsProps> = ({ statValue }) => {
  return (
    <div className="p-4 truncate sm:whitespace-normal md:hidden">
      <dd className="mt-3 text-blue-400 font-semibold text-2xl">{statValue}</dd>
    </div>
  );
};

export default Stats;
