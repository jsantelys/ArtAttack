import axios, { AxiosInstance } from "axios"
import { AxiosResponse } from "axios"
import API_PATHS from "./ApiPaths"

export const BASE_URL = "https://api.artic.edu/api/v1"

export class ApiManager {
    private readonly axiosClient: AxiosInstance

    constructor(axiosInstance: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'AIC-User-Agent': 'ArtAttack (javiersantelys@gmail.com)',
        },
    })) {
        this.axiosClient = axiosInstance;
    }

    private dataFields = [
        'id',
        'title',
        'date_display',
        'artist_title',
        'thumbnail',
        'image_id'
    ]

    private detailDataFields = [
        'title',
        'artist_title',
        'date_display',
        'description',
        'place_of_origin',
        'dimensions',
        'medium_display',
        'category_titles',
        'publication_history',
    ]

    getArtworks<T>(): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            this.axiosClient.get(API_PATHS.getArtworks, {
                params: {
                    fields: this.dataFields.join(',')
                }
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }
    getArtworksByPage<T>(page: number): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            this.axiosClient.get(API_PATHS.getArtworks, {
                params: {
                    fields: this.dataFields.join(','),
                    page: page,
                }
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }
    getArtworkById<T>(id: string): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            this.axiosClient.get(API_PATHS.getArtworkById(id), {
                params: {
                    fields: this.detailDataFields.join(',')
                }
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }
    getArtworksBySearch<T>(search: string): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            this.axiosClient.get(API_PATHS.getArtworkBySearch, {
                params: {
                    fields: this.dataFields.join(','),
                    q: search,
                    limit: 50
                }
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }
}

const apiManager = new ApiManager();

export default apiManager;