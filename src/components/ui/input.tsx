import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-base text-foreground placeholder:text-zinc-500 transition-all duration-200 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50 font-mono",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
