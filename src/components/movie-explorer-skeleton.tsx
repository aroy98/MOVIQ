import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MovieExplorerSkeleton() {
    return (
        <div>
            <div className="h-[40vh] w-full bg-muted" />
            <div className="mx-auto max-w-6xl -mt-16 pb-12">
                <Card>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
                        <Skeleton className="w-full aspect-[2/3]" />
                        <div>
                            <Skeleton className="h-6 w-2/3 mb-3" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6 mb-2" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                    </CardContent>
                </Card>
                <h3 className="text-xl font-semibold mt-10 mb-3">Top Billed Cast</h3>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}><CardContent className="p-0">
                            <Skeleton className="w-full aspect-[2/3]" />
                            <div className="p-3">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </CardContent></Card>
                    ))}
                </div>
            </div>
        </div>
    );
}