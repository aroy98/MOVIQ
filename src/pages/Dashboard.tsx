import { ENDPOINTS } from "@/api/endpoints";
import MovieExplorer from "@/components/movie-explorer";

export default function Dashboard() {

    return (
        <MovieExplorer endpoint={ENDPOINTS.DISCOVER} searchEnabled />
    );

}