import { View, Text, Pressable, StyleSheet } from 'react-native'
import API_PATHS from '../../api/ApiPaths'
import React, { memo } from 'react'
import { ArtPreview } from '../../types/ArtInterface'
import { Colors, Spacing } from '../../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { FavoriteState } from '../../redux/slices/FavoriteSlice'
import { useTheme } from '@react-navigation/native'

interface cardProps {
    item: ArtPreview
    handleNavigation: (id: number, image_id: string) => void;
    handleFavorite: (item: ArtPreview, isFavorite: boolean) => void;
}

import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const CardComponent = ({ item, handleNavigation, handleFavorite }: cardProps) => {

    const isFavorite = useSelector((state: FavoriteState) =>
        ((state.favorites.findIndex((e) => e.image_id === item.image_id)) !== -1))

    const scale = useSharedValue(1)

    const handlePress = () => {
        scale.value = withSequence(
            withSpring(0, { duration: 200 }),
            withSpring(1, { duration: 200 })
        )
    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            scale: scale.value
        }],
    }))

    return (
        <Animated.View style={styles.card}>
            <Pressable onPress={() => handleNavigation(item.id, item.image_id)}>
                <View>
                    <Animated.Image
                        source={{ uri: API_PATHS.getIIFImage(item.image_id) }}
                        sharedTransitionTag={`detailImage${item.image_id}`}
                        style={styles.image} />
                    <View>
                        <View style={styles.text_container}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </View>
                    <AnimatedIcon style={[styles.favoriteIcon, animatedStyles]}
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={32}
                        color={isFavorite ? 'red' : 'white'}
                        onPress={() => {
                            handleFavorite(item, isFavorite)
                            handlePress()
                        }} />
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default memo(CardComponent)

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginTop: 16,
        ...Spacing.shadow
    },
    text_container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 8,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    text: {
        color: 'white',
        fontFamily: 'Libre Baskerville'
    },
    image: {
        width: '100%',
        aspectRatio: 1.3,
        borderRadius: 16,
        resizeMode: 'cover',
        overflow: 'hidden',
        opacity: 0.9
    },
    favoriteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 8,
        marginTop: 8,
    }
})