import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArtPreview } from '../../types/ArtInterface';
import CardComponent from '../../components/card/CardComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SCREEN_NAMES from '../../constants/ScreenNames';
import { FavoritesStackParamList } from '../../navigation/FavoritesStack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/BottomTabStack';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectFavorites } from '../../redux/slices/FavoriteSlice';
import Animated, { LinearTransition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = CompositeScreenProps<
    NativeStackScreenProps<FavoritesStackParamList, 'My Favorites'>,
    BottomTabScreenProps<BottomTabParamList>
>

export default function FavoriteScreen({ navigation }: Props) {

    const insets = useSafeAreaInsets();
    const favorites = useSelector(selectFavorites)
    const dispatch = useDispatch()

    const navigateToDetail = (id: number, image_id: string) => {
        navigation.navigate(SCREEN_NAMES.favoriteDetail, {
            id,
            image_id
        })
    }
    const handleFavorite = (item: ArtPreview, isFavorite: boolean) => {
        if (!isFavorite) {
            dispatch(addFavorite(item))
        }
        else {
            dispatch(removeFavorite(item))
        }
    }

    const EmptyListMessage = () => {
        return (
            <View style={styles.emptyListMessageContainer}>
                <Icon name='heart-broken' size={24} />
                <Text>No favorites yet</Text>
            </View>
        )
    }

    return (

        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Animated.FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <CardComponent
                        item={item}
                        handleNavigation={navigateToDetail}
                        handleFavorite={handleFavorite}
                    />
                )}
                keyExtractor={(item) => item.image_id}
                contentContainerStyle={{ paddingBottom: 8, marginHorizontal: 8, flexGrow: 1 }}
                ListEmptyComponent={EmptyListMessage}
                itemLayoutAnimation={LinearTransition.duration(300)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    emptyListMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})