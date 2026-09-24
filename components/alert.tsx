import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

type AlertProps = {
  type: "info" | "error" | "success" | "warning";
  message: string;
  className?: string;
};

const Alert: React.FC<AlertProps> = ({ type, message, className = "" }) => {
  let icon = null;
  let bgColor = "";
  let textColor = "";

  switch (type) {
    case "info":
      icon = <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />;
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    case "error":
      icon = <XCircleIcon className="w-5 h-5 flex-shrink-0" />;
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    case "success":
      icon = <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />;
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "warning":
      icon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />;
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 text-xl rounded-md ${bgColor} ${textColor} ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="break-all text-xs">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
