import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
    return (
        <Card className="relative overflow-hidden rounded-2xl border bg-card/50 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.02] py-0">
            <AspectRatio ratio={2 / 3} className="relative">
                {/* Poster skeleton */}
                <Skeleton className="absolute inset-0 h-full w-full" />

                {/* Gradient overlay for consistent style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Title badge skeleton (bottom-left) */}
                <div className="absolute bottom-2 left-2 z-10">
                    <Skeleton className="h-5 w-24 rounded-full bg-white/20" />
                </div>

                {/* Year badge skeleton (bottom-right) */}
                <div className="absolute bottom-2 right-2 z-10">
                    <Skeleton className="h-5 w-10 rounded-full bg-white/20" />
                </div>

                {/* Rating badge skeleton (top-right) */}
                <div className="absolute top-2 right-2 z-10">
                    <Skeleton className="h-5 w-12 rounded-full bg-white/20" />
                </div>
            </AspectRatio>
        </Card>
    );
}
