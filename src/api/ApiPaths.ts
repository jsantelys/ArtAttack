const API_PATHS = {
    getArtworks: "/artworks/",
    getArtworkBySearch: '/artworks/search',
    getArtworkById: (identifier: string) => `/artworks/${identifier}/`,
    getIIFImage: (identifier: string) => `https://www.artic.edu/iiif/2/${identifier}/full/200,/0/default.jpg`,
    getIFFImageHD: (identifier: string) => `https://www.artic.edu/iiif/2/${identifier}/full/843,/0/default.jpg`,
}

export default API_PATHS