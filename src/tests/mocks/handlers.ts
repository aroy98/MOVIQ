// @vitest-environment jsdom
import { http, HttpResponse, type PathParams } from "msw";
import { ENDPOINTS } from "@/api/endpoints";

const sampleMovie = {
  id: 27205,
  title: "Inception",
  overview: "A mind-bending thriller.",
  release_date: "2010-07-15",
  vote_average: 8.8,
  poster_path: "/inception.jpg",
};

export const handlers = [
  // Discover endpoints (for Dashboard and mood pages)
  http.get(ENDPOINTS.DISCOVER, () => {
    return HttpResponse.json({
      page: 1,
      results: [sampleMovie, { ...sampleMovie, id: 2, title: "Another" }],
      total_pages: 1,
      total_results: 2,
    });
  }),

  http.get(ENDPOINTS.FEEL_GOOD, () => {
    return HttpResponse.json({ page: 1, results: [sampleMovie] });
  }),

  http.get(ENDPOINTS.ACTION_FIX, () => {
    return HttpResponse.json({ page: 1, results: [sampleMovie] });
  }),

  http.get(ENDPOINTS.MIND_BINDERS, () => {
    return HttpResponse.json({ page: 1, results: [sampleMovie] });
  }),

  // Search
  http.get(ENDPOINTS.SEARCH, ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("query");
    if (q === "Inception") {
      return HttpResponse.json({ page: 1, results: [sampleMovie] });
    }
    return HttpResponse.json({ page: 1, results: [] });
  }),

  // Movie details
  http.get(ENDPOINTS.MOVIE_DETAILS(":id"), ({ params }) => {
    const { id } = params as PathParams;
    if (String(id) === String(sampleMovie.id)) {
      return HttpResponse.json({ ...sampleMovie, runtime: 148, genres: [{ id: 1, name: "Sci-Fi" }] });
    }
    return HttpResponse.json({ status_code: 34, status_message: "Not Found" }, { status: 404 });
  }),

  http.get(ENDPOINTS.MOVIE_CREDITS(":id"), ({ params }) => {
    const { id } = params as PathParams;
    if (String(id) === String(sampleMovie.id)) {
      return HttpResponse.json({
        id,
        cast: [{ id: 10, name: "Leonardo DiCaprio", character: "Cobb", profile_path: "/leo.jpg" }],
        crew: [{ id: 20, name: "Christopher Nolan", job: "Director" }],
      });
    }
    return HttpResponse.json({ id, cast: [], crew: [] });
  }),

  http.get(ENDPOINTS.MOVIE_VIDEOS(":id"), ({ params }) => {
    const { id } = params as PathParams;
    if (String(id) === String(sampleMovie.id)) {
      return HttpResponse.json({
        id,
        results: [{ id: "t1", key: "YoHD9XEInc0", site: "YouTube", type: "Trailer" }],
      });
    }
    return HttpResponse.json({ id, results: [] });
  }),

  http.get(ENDPOINTS.MOVIE_SIMILAR(":id"), ({ params }) => {
    const { id } = params as PathParams;
    if (String(id) === String(sampleMovie.id)) {
      return HttpResponse.json({
        page: 1,
        results: [{ ...sampleMovie, id: 99, title: "Interstellar" }],
      });
    }
    return HttpResponse.json({ page: 1, results: [] });
  }),
];
