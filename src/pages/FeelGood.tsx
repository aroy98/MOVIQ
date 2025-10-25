import { ENDPOINTS } from "@/api/endpoints";
import MovieExplorer from "@/components/movie-explorer";

export default function FeelGood() {

    return (
        <MovieExplorer endpoint={ENDPOINTS.FEEL_GOOD} />
    );

}
