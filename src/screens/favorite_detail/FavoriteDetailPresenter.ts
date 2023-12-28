import apiManager from "../../api/ApiManager"
import { ArtWorkDetailResponse } from "../../types/ApiInterface"
import { ArtDetail } from "../../types/ArtInterface"

export default class FavoriteDetailPresenter {

    htmlToPlainText = (text: string | null) => {
        if (text) {
            const filterRegex = new RegExp(/<[^>]+>/, 'g')
            return text.replace(filterRegex, '')
        }
        return null
    }

    getArtWork(id: string): Promise<ArtDetail> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiManager.getArtworkById<ArtWorkDetailResponse>(id)
                const responseData = response.data
                const data = {
                    ...responseData.data,
                    description: this.htmlToPlainText(responseData.data.description)
                }
                resolve(data)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    formatAdditionalInfo(item: ArtDetail) {
        const formattedData = {
            Place: item.place_of_origin,
            Dimensions: item.dimensions,
            Medium: item.medium_display,
            Category: item.category_titles ? item.category_titles[0] : undefined,
            "Publication History": item.publication_history ? item.publication_history : undefined,
            "Exhibition History": item.exhibition_history ? item.exhibition_history : undefined
        }
        return Object.entries(formattedData).filter((element) => element[1])
    }
}