import { ENDPOINTS } from "@/api/endpoints";
import MovieExplorer from "@/components/movie-explorer";

export default function MindBenders() {

    return (
        <MovieExplorer endpoint={ENDPOINTS.MIND_BINDERS} />
    );

}