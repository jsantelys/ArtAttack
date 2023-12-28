import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DetailScreen from '../screens/card_detail/DetailScreen';
import SCREEN_NAMES from '../constants/ScreenNames';


export type HomeStackParamList = {
    [SCREEN_NAMES.dashboard]: undefined;
    [SCREEN_NAMES.detail]: {
        id: number,
        image_id: string,
    };
}

const HomeStackNavigation = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
    return (
        <HomeStackNavigation.Navigator>
            <HomeStackNavigation.Screen
                name={SCREEN_NAMES.dashboard}
                component={DashboardScreen}
                options={({ navigation, route }) => ({
                    headerShown: false,
                })}
            />
            <HomeStackNavigation.Screen
                name={SCREEN_NAMES.detail}
                component={DetailScreen}
                options={{
                    headerShown: true
                }} />
        </HomeStackNavigation.Navigator>
    )
}