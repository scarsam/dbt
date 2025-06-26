import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "~/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
  const StartIcon = startIcon;
  const EndIcon = endIcon;

  return (
    <div className="w-full relative">
      {StartIcon && (
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
          <StartIcon size={16} className="text-muted-foreground" />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startIcon ? "pl-8" : "",
          endIcon ? "pr-8" : "",
          className
        )}
        {...props}
      />
      {EndIcon && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
          <EndIcon size={16} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export { Input };
