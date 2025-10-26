import type { LucideIcon } from "lucide-react"

export interface Movie {
    id: number
    title: string
    year: string | number
    posterUrl: string
    rating?: number | null
}

export interface MovieCardProps extends Movie {
    onClick?: () => void;
    scale?: number;
    has(id: number): boolean;
    toggle(movie: Movie): void;
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
    has(id: number): boolean;
    toggle(movie: Movie): void;
}

export interface Menu {
    name: string
    url: string
    icon: LucideIcon
}

export interface WatchlistState {
    map: Record<number, Movie>;
    hydrated: boolean;
    has(id: number): boolean;
    add(movie: Movie): void;
    remove(id: number): void;
    toggle(movie: Movie): void;
    clear(): void;
    setHydrated(v: boolean): void;
}
