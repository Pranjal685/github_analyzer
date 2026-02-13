import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    {
                        "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]":
                            variant === "default",
                        "border border-white/15 bg-transparent hover:bg-white/10 text-foreground":
                            variant === "outline",
                        "hover:bg-white/10 text-foreground": variant === "ghost",
                        "bg-red-500/80 text-white hover:bg-red-500": variant === "destructive",
                    },
                    {
                        "h-10 px-4 py-2": size === "default",
                        "h-9 px-3 text-xs": size === "sm",
                        "h-12 px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
