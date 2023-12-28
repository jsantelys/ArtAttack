import DashboardPresenter from "../DashboardPresenter"
import apiManager from "../../../api/ApiManager"

jest.mock('../../../api/ApiManager', () => ({
    getArtworks: jest.fn().mockReturnValue({ data: { data: [{ image_id: "name" }, { image_id: null }] } }),
    getArtworksByPage: jest.fn().mockReturnValue({ data: { data: [{ image_id: "name" }, { image_id: null }] } }),
    getArtworksBySearch: jest.fn().mockReturnValue({ data: { data: [{ image_id: "name" }, { image_id: null }] } }),
}))

describe('DashboardPresenter', () => {
    let dashboardPresenter: DashboardPresenter
    beforeEach(() => {
        dashboardPresenter = new DashboardPresenter()
    });

    test('should get Artwork with images', async () => {
        const response = await dashboardPresenter.getArtworks()
        expect(apiManager.getArtworks).toHaveBeenCalledTimes(1)
        expect(response).toStrictEqual([{ image_id: "name" }])
    })

    test('should change page number when called twice', async () => {
        await dashboardPresenter.getMoreArtWorks()
        const response = await dashboardPresenter.getMoreArtWorks()

        expect(apiManager.getArtworksByPage).toHaveBeenCalledTimes(2)
        expect(apiManager.getArtworksByPage).toHaveBeenCalledWith(2)
        expect(apiManager.getArtworksByPage).toHaveBeenCalledWith(3)

        expect(response).toStrictEqual([{ image_id: "name" }])
    })

    test('should receive the search query', async () => {
        const response = await dashboardPresenter.getArtworksBySearch('search')

        expect(apiManager.getArtworksBySearch).toHaveBeenCalledTimes(1)
        expect(apiManager.getArtworksBySearch).toHaveBeenCalledWith('search')

        expect(response).toStrictEqual([{ image_id: "name" }])
    })
})