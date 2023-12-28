import { StyleSheet, Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { ActivityIndicator } from 'react-native'

export default class Spinner extends PureComponent {
    render() {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})