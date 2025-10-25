import type { LucideIcon } from "lucide-react"

export interface Movie {
    id: number
    title: string
    year: string | number
    posterUrl: string
    rating?: number | null
}

export interface MovieExplorerProps {
    endpoint: string;
    searchEnabled?: boolean;
    minCardWidth?: number;
    gap?: number;
}

export interface MovieResult {
    page?: number;
    results: any[];
    total_pages: number;
    total_results: number;
    query?: string;
}

export interface WatchListProps {
    movie: Movie;
    className?: string;
    size?: number;
}

export interface Menu {
    name: string
    url: string
    icon: LucideIcon
}