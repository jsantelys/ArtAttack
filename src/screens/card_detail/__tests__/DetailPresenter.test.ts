import DetailPresenter from "../DetailPresenter"
import apiManager from "../../../api/ApiManager"
import { ArtDetail } from "../../../types/ArtInterface"

jest.mock('../../../api/ApiManager', () => ({
    getArtworkById: jest.fn().mockReturnValue({
        data: {
            data: {
                image_id: "name",
                description: "<p>text</p>"
            }
        }
    }),
}))

describe('DetailPresenter', () => {
    let detailPresenter: DetailPresenter
    beforeEach(() => {
        detailPresenter = new DetailPresenter()
    });

    test('getDetails', async () => {
        const response = await detailPresenter.getArtWork('id')
        expect(apiManager.getArtworkById).toHaveBeenCalledTimes(1)
        expect(apiManager.getArtworkById).toHaveBeenCalledWith('id')
        expect(response).toStrictEqual({ image_id: "name", description: "text" })
    })

    test('should filter all null values', () => {
        const data = detailPresenter.formatAdditionalInfo(
            {
                place_of_origin: "place",
                publication_history: null,
                medium_display: "medium",

            } as ArtDetail
        )
        expect(data).toStrictEqual([["Place", "place"], ["Medium", "medium"]])
    })
})