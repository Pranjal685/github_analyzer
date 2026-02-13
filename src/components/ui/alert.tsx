import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "destructive";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = "default", ...props }, ref) => (
        <div
            ref={ref}
            role="alert"
            className={cn(
                "relative w-full rounded-xl border p-4",
                {
                    "border-white/10 bg-white/5 text-white": variant === "default",
                    "border-red-500/30 bg-red-500/10 text-red-300": variant === "destructive",
                },
                className
            )}
            {...props}
        />
    )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm opacity-80", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
