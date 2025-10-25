import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"


export default function NotFound() {
    return (
        <div className="flex justify-center items-center min-h-screen w-full p-4">
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>404 - Not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you&apos;re looking for doesn&apos;t exist.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}
