import { ArtDetail, ArtPreview } from "./ArtInterface"

export interface ArtworkResponse {
    pagination: ArtPagination
    data: ArtPreview[]
}

export interface ArtWorkDetailResponse {
    data: ArtDetail
}

export interface ArtPagination {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
    next_url: string
}