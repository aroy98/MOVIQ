// src/api/endpoints.ts
export const ENDPOINTS = {
  SEARCH: "/search/movie",
  DISCOVER: "/discover/movie",
  FEEL_GOOD: "/discover/movie?with_genres=35,10751&sort_by=popularity.desc",
  ACTION_FIX: "/discover/movie?with_genres=28,12&sort_by=popularity.desc",
  MIND_BINDERS: "/discover/movie?with_genres=9648,878&sort_by=vote_average.desc",
  MOVIE_DETAILS: (id: string | number) => `/movie/${id}?append_to_response=release_dates`,
  MOVIE_CREDITS: (id: string | number) => `/movie/${id}/credits`,
  MOVIE_VIDEOS:  (id: string | number) => `/movie/${id}/videos`,
  MOVIE_SIMILAR: (id: string | number) => `/movie/${id}/similar`,
  IMAGE: (path: string, size: "w342"|"w780"|"w1280"|"original" = "w780") => `https://image.tmdb.org/t/p/${size}${path}`,
};
