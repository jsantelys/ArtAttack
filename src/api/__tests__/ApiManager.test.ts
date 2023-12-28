import { ApiManager, BASE_URL } from '../ApiManager';
import API_PATHS from '../ApiPaths';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('ApiManager', () => {
    let apiManager: ApiManager
    let mock: MockAdapter;

    beforeEach(() => {
        const mockAxios = axios.create({
            baseURL: BASE_URL,
            headers: {
                'AIC-User-Agent': 'ArtAttack (javiersantelys@gmail.com)',
            },
        })
        mock = new MockAdapter(mockAxios);
        apiManager = new ApiManager(mockAxios)
    });

    it('should get artworks', async () => {
        const expected = { data: 'expected value' };
        mock.onGet(API_PATHS.getArtworks).reply(200, expected);

        const response = await apiManager.getArtworks();

        expect(response.data).toStrictEqual(expected);
    });

    it('should get artworks by page', async () => {
        const expected = { data: 'expected value' };
        mock.onGet(API_PATHS.getArtworks, {
            params: {
                fields: 'id,title,date_display,artist_title,thumbnail,image_id',
                page: 1
            }
        }).reply(200, expected)

        const response = await apiManager.getArtworksByPage(1);

        expect(response.data).toStrictEqual(expected);
    });

    it('should get artwork by id', async () => {
        const expected = { data: 'expected value' };
        mock.onGet(API_PATHS.getArtworkById('1')).reply(200, expected);

        const response = await apiManager.getArtworkById('1');

        expect(response.data).toStrictEqual(expected);
    });

    it('should get artworks by search', async () => {
        const expected = { data: 'expected value' };
        mock.onGet(API_PATHS.getArtworkBySearch, {
            params: {
                fields: 'id,title,date_display,artist_title,thumbnail,image_id',
                q: 'search term',
                limit: 50
            }
        }).reply(200, expected);

        const response = await apiManager.getArtworksBySearch('search term');

        expect(response.data).toStrictEqual(expected);
    });
});
