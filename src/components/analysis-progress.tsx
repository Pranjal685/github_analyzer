"use client";

import { useEffect, useState } from "react";
import { Github, Brain, CheckCircle2 } from "lucide-react";

const STEPS = [
    { icon: Github, text: "Connecting to GitHub API...", duration: 800 },
    { icon: Github, text: "Fetching profile data...", duration: 1200 },
    { icon: Github, text: "Scanning repositories...", duration: 1500 },
    { icon: Github, text: "Reading README files...", duration: 1000 },
    { icon: Brain, text: "Running AI analysis...", duration: 2000 },
    { icon: Brain, text: "Evaluating code quality...", duration: 1500 },
    { icon: Brain, text: "Generating score...", duration: 1000 },
];

export function AnalysisProgress() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        function advanceStep() {
            setCurrentStep((prev) => {
                const next = prev + 1;
                if (next < STEPS.length) {
                    timeout = setTimeout(advanceStep, STEPS[next].duration);
                }
                return next;
            });
        }
        timeout = setTimeout(advanceStep, STEPS[0].duration);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="space-y-2">
            {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === currentStep;
                const isDone = i < currentStep;


                return (
                    <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-500 ${isActive
                            ? "bg-cyan-500/10 border border-cyan-500/20"
                            : isDone
                                ? "opacity-60"
                                : "opacity-20"
                            }`}
                    >
                        {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                            <Icon
                                className={`h-4 w-4 shrink-0 ${isActive
                                    ? "text-cyan-400 animate-pulse"
                                    : "text-muted-foreground"
                                    }`}
                            />
                        )}
                        <span
                            className={`text-sm font-mono ${isActive
                                ? "text-cyan-400"
                                : isDone
                                    ? "text-muted-foreground line-through"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {step.text}
                        </span>
                        {isActive && (
                            <span className="ml-auto flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
