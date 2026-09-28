import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-slate-50/50 focus:bg-white transition-all font-medium text-slate-800 placeholder-slate-400"
        placeholder="Mot de passe"
        {...props}
        ref={ref}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
