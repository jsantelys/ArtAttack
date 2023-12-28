
export interface ArtPreview {
    id: number
    title: string
    artist_title: string
    date_display: string
    thumbnail: ArtThumbnail
    image_id: string
}

export interface ArtThumbnail {
    lqip: string
    width: number
    height: number
    alt_text: string
}

export interface ArtDetail {
    title: string
    artist_title: string
    date_display: string
    description: string | null
    place_of_origin: string
    dimensions: string
    medium_display: string
    category_titles: string[]
    publication_history: string | null,
    exhibition_history: string | null

}