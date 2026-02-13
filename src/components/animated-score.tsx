"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedScoreProps {
    score: number;
    className?: string;
}

/**
 * Animated score counter that counts up from 0 to the target score.
 * Uses easeOutExpo for a satisfying deceleration effect.
 */
export function AnimatedScore({ score, className }: AnimatedScoreProps) {
    const [displayScore, setDisplayScore] = useState(0);
    useEffect(() => {
        // Allow re-animation when score updates

        const duration = 1800; // ms
        const startTime = performance.now();

        function easeOutExpo(t: number): number {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentScore = Math.round(easedProgress * score);

            setDisplayScore(currentScore);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        // Small delay so the card fades in first
        const timer = setTimeout(() => {
            requestAnimationFrame(animate);
        }, 400);

        return () => clearTimeout(timer);
    }, [score]);

    const scoreTextClass =
        score < 50
            ? "score-red"
            : score < 80
                ? "score-yellow"
                : "score-green";

    return (
        <span className={cn(`text-4xl font-bold font-mono ${scoreTextClass}`, className)}>
            {displayScore}
            <span className="text-lg text-muted-foreground">/100</span>
        </span>
    );
}

interface AnimatedProgressBarProps {
    score: number;
    indicatorClassName?: string;
    className?: string;
}

/**
 * Progress bar that animates from 0% to the target width.
 */
export function AnimatedProgressBar({ score, indicatorClassName, className }: AnimatedProgressBarProps) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Delay to sync with the score counter
        const timer = setTimeout(() => {
            setWidth(score);
        }, 500);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-white/10", className)}>
            <div
                className={cn(
                    "h-full rounded-full transition-all duration-[1.8s] ease-out",
                    indicatorClassName
                )}
                style={{ width: `${Math.max(0, Math.min(100, width))}%` }}
            />
        </div>
    );
}
