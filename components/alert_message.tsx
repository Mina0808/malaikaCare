import {
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import TooltipComponent from "@/components/tooltip";

type AlertProps = {
  status: "SUBMITTED" | "AWAITING_CORRECTION" | "PENDING_RECEIPT" | "ARRIVED_AT_DESTINATION";
  role: "CLIENT" | "STAFF"
  trackingNumber?: boolean;
  className?: string;
};

const Alert: React.FC<AlertProps> = ({ status, role, trackingNumber, className = "" }) => {
  let icon = null;
  let textColor = "text-red-800";
  let message = ""

  switch (status) {
    case "SUBMITTED":
      if (role === "STAFF") {
        icon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />;
        message = "Merci de valider la signalisation"
      }
      break;
    case "AWAITING_CORRECTION":
      if (role === "CLIENT") {
        icon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />;
        message = "Merci de corriger votre signalisation"
      }
      break;
    case "PENDING_RECEIPT":
      if (!trackingNumber && role === "CLIENT") {
        icon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />;
        message = "Merci d'ajouter votre numéro de suivi"
      }
      break;
    case "ARRIVED_AT_DESTINATION":
      if (role === "CLIENT") {
        icon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />;
        message = "Veuillez choisir un mode de livraison"
      }
      break;
    default:
      break;
  }

  return (
    // <div
    //   className={`flex items-center justify-between px-4 py-2 text-xl rounded-md ${bgColor} ${textColor} ${className}`}
    // >
    //   <div className="flex items-center gap-2">
    //     {icon}
    //     <span className="break-all text-xs">{message}</span>
    //   </div>
    // </div>
    <div
      className={`flex items-center justify-between text-xl rounded-md ${textColor} ${className}`}
    >
      <TooltipComponent msg={message}>
        <div className="flex items-center gap-2">
          {icon}
        </div>
      </TooltipComponent>
    </div>
  );
};

export default Alert;
