import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function Loader({ message = 'Loading' }: { message?: string }) {
    return (
        <div className="flex justify-center items-center min-h-screen w-full p-4">
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 text-base shadow-md">
                <Spinner className="size-4" />
                <span>{message}</span>
            </Badge>
        </div>
    )
}
