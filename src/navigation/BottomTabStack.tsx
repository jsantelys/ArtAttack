import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SCREEN_NAMES from '../constants/ScreenNames'
import HomeStack from './HomeStack'
import FavoritesStack from './FavoritesStack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type BottomTabParamList = {
    [SCREEN_NAMES.homeStack]: undefined;
    [SCREEN_NAMES.favoriteStack]: undefined;
}
const BottomTabNavigation = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabStack() {
    return (
        <BottomTabNavigation.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = "help";

                    //TODO: Add animation and displacement to selected tab

                    if (route.name === "Home") {
                        iconName = focused ? 'home-variant' : 'home-variant-outline'
                    }
                    else if (route.name === "Favorites") {
                        iconName = focused ? 'folder-heart' : 'folder-heart-outline'
                    }
                    return <Icon name={iconName} size={size} color={color} />
                },
                tabBarLabel: navigation.isFocused() ? route.name : ''
            })}>
            <BottomTabNavigation.Screen
                name={SCREEN_NAMES.homeStack}
                component={HomeStack}
            >
            </BottomTabNavigation.Screen>
            <BottomTabNavigation.Screen
                name={SCREEN_NAMES.favoriteStack}
                component={FavoritesStack}
            >
            </BottomTabNavigation.Screen>
        </BottomTabNavigation.Navigator>
    )
}