import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const palette = {
    purple: '#5D3F6A',
    darkPurple: '#412c49',
    green: '#438d5d',
    darkGreen: '#224930',
    berry: '#940000',
    darkBerry: '#560d0d',
    white: '#F2F1EF'
}

export const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: palette.berry,
        darkCard: palette.darkBerry,
        primary: palette.white,
        text: palette.white
    },
}

export const MyDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "rgb(1,1,1)"
    }
}