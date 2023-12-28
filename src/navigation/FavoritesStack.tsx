import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SCREEN_NAMES from '../constants/ScreenNames';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import FavoriteDetailScreen from '../screens/favorite_detail/FavoriteDetailScreen';

export type FavoritesStackParamList = {
    [SCREEN_NAMES.favorites]: undefined;
    [SCREEN_NAMES.favoriteDetail]: {
        id: number,
        image_id: string,
    };
}

const HomeStackNavigation = createNativeStackNavigator<FavoritesStackParamList>()

export default function FavoritesStack() {
    return (
        <HomeStackNavigation.Navigator initialRouteName={SCREEN_NAMES.favorites}>
            <HomeStackNavigation.Screen
                name={SCREEN_NAMES.favorites}
                component={FavoritesScreen} />
            <HomeStackNavigation.Screen
                name={SCREEN_NAMES.favoriteDetail}
                component={FavoriteDetailScreen} />
        </HomeStackNavigation.Navigator>
    )
}