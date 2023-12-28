import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ArtPreview } from '../../types/ArtInterface'
import { RootState } from '../store'

export interface FavoriteState {
    favorites: ArtPreview[]
}

const initialState: FavoriteState = {
    favorites: []
}

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<ArtPreview>) => {
            state.favorites.push(action.payload)
        },
        removeFavorite: (state, action: PayloadAction<ArtPreview>) => {
            state.favorites.splice(state.favorites.findIndex((item) => item.image_id === action.payload.image_id), 1)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite } = favoriteSlice.actions

export const selectFavorites = (state: RootState) => state.favorites

export default favoriteSlice.reducer