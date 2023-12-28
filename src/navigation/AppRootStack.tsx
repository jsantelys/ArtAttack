import React from 'react'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '@react-navigation/native';
import BottomTabStack from './BottomTabStack';
import SCREEN_NAMES from '../constants/ScreenNames';
import { StatusBar } from 'react-native';
import { MyTheme } from '../styles/Theme';


interface AppRootStackProps {
    theme: Theme
}

export type RootStackParams = {
    [SCREEN_NAMES.root]: undefined;
}

const AppStackNavigation = createNativeStackNavigator<RootStackParams>()

export default function AppRootStack({ theme }: AppRootStackProps) {
    return (
        <NavigationContainer theme={theme}>
            <StatusBar backgroundColor={MyTheme.colors.darkCard} />
            <AppStackNavigation.Navigator>
                <AppStackNavigation.Screen
                    name={SCREEN_NAMES.root}
                    component={BottomTabStack}
                    options={{
                        headerShown: false
                    }} />
            </AppStackNavigation.Navigator>
        </NavigationContainer>
    )
}