import React from "react";

export default function Description({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xl font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
}
