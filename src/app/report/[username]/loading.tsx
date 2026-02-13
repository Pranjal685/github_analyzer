import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { AnalysisProgress } from "@/components/analysis-progress";

export default function ReportLoading() {
    return (
        <main className="relative min-h-screen px-4 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Scanning Banner with live progress */}
                <div className="animate-fade-in-up">
                    <Card className="relative overflow-hidden scan-line">
                        <CardContent className="pt-6 pb-4">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Terminal className="h-5 w-5 text-cyan-400 animate-glow-pulse" />
                                <span className="text-cyan-400 font-mono text-sm font-semibold">
                                    Analyzing Profile...
                                </span>
                            </div>
                            <AnalysisProgress />
                        </CardContent>
                    </Card>
                </div>

                {/* User Header Skeleton */}
                <div className="animate-fade-in-up-delay-1">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                <Skeleton className="w-[88px] h-[88px] rounded-xl" />
                                <div className="flex-1 space-y-3 text-center sm:text-left">
                                    <Skeleton className="h-7 w-48 mx-auto sm:mx-0" />
                                    <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
                                    <Skeleton className="h-4 w-64 mx-auto sm:mx-0" />
                                    <div className="flex gap-3 justify-center sm:justify-start">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-28" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Score Card Skeleton */}
                <div className="animate-fade-in-up-delay-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-10 w-20" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-full rounded-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </Card>
                </div>

                {/* Strengths, Weaknesses & Fixes Skeleton */}
                <div className="animate-fade-in-up-delay-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((col) => (
                        <Card key={col}>
                            <CardHeader>
                                <Skeleton className="h-5 w-28" />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                                        <Skeleton className="h-4 flex-1" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Repos Skeleton */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-36" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-lg border border-white/5 space-y-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-16 rounded-md" />
                                    </div>
                                    <Skeleton className="h-3 w-full" />
                                    <div className="flex gap-3">
                                        <Skeleton className="h-3 w-12" />
                                        <Skeleton className="h-3 w-8" />
                                        <Skeleton className="h-3 w-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
