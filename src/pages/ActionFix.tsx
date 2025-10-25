import { ENDPOINTS } from "@/api/endpoints";
import MovieExplorer from "@/components/movie-explorer";

export default function ActionFix() {
    return (
        <MovieExplorer endpoint={ENDPOINTS.ACTION_FIX} />
    );
}