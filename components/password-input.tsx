import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { forwardRef, useState } from "react";

export const PasswordInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="input border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-2xl  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14"
        placeholder="Mot de passe"
        {...props}
        ref={ref}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
