import apiManager from "../../api/ApiManager"
import { ArtworkResponse } from "../../types/ApiInterface"
import { ArtPreview } from "../../types/ArtInterface"

export default class DashboardPresenter {
    currentPage: number

    constructor() {
        this.currentPage = 2
    }

    goNextPage() {
        this.currentPage++
        return this
    }

    getArtworks(): Promise<ArtPreview[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiManager.getArtworks<ArtworkResponse>()
                const responseData = response.data
                const filteredData = responseData.data.filter((item) => item.image_id !== null)
                resolve(filteredData)
            }
            catch (error) {
                reject(error)
            }
        })
    }
    getMoreArtWorks(): Promise<ArtPreview[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiManager.getArtworksByPage<ArtworkResponse>(this.currentPage)
                this.goNextPage()
                const responseData = response.data
                const filteredData = responseData.data.filter((item) => item.image_id !== null)
                resolve(filteredData)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    getArtworksBySearch(searchQuery: string): Promise<ArtPreview[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiManager.getArtworksBySearch<ArtworkResponse>(searchQuery)
                const responseData = response.data
                const filteredData = responseData.data.filter((item) => item.image_id !== null)
                resolve(filteredData)
            }
            catch (error) {
                reject(error)
            }
        })
    }
}