export function Crew({ details }: { details: any }) {
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold mb-1">Status</h4>
                <div className="opacity-80">{details.status ?? "—"}</div>
            </div>
            <div>
                <h4 className="font-semibold mb-1">Language</h4>
                <div className="opacity-80">{(details.spoken_languages?.[0]?.english_name) ?? "—"}</div>
            </div>
        </div>
    );
}