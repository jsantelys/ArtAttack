import { View, FlatList, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DashboardPresenter from './DashboardPresenter';
import { ArtPreview } from '../../types/ArtInterface';
import CardComponent from '../../components/card/CardComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SCREEN_NAMES from '../../constants/ScreenNames';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { CompositeScreenProps, useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/BottomTabStack';
import { addFavorite, removeFavorite } from '../../redux/slices/FavoriteSlice';
import { useDispatch } from 'react-redux';
import { Header } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import Spinner from '../../ui/Spinner';
import Animated, { StretchInX, StretchOutX, } from 'react-native-reanimated';
import ErrorModal from '../../ui/ErrorModal'
import { AxiosError } from 'axios';

type Props = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'Dashboard'>,
    BottomTabScreenProps<BottomTabParamList>
>

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const dashboardPresenter = new DashboardPresenter()

export default function DashboardScreen({ navigation, route }: Props) {

    const insets = useSafeAreaInsets();
    const dispatch = useDispatch()

    const { colors } = useTheme()

    const [artList, setArtList] = useState<ArtPreview[]>()
    const [searchResults, setSearchResults] = useState<ArtPreview[]>()
    const [isFetching, setIsFetching] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)

    const flalistRef = useRef(null)

    useScrollToTop(flalistRef)

    useFocusEffect(() => {
        if (!artList) {
            dashboardPresenter.getArtworks()
                .then((data) => {
                    setArtList(data)
                }).catch((error: AxiosError) => {
                    setError(error.message)
                    setShowError(true)
                })
        }
    })

    const navigateToDetail = (id: number, image_id: string) => {
        navigation.navigate(SCREEN_NAMES.detail, {
            id,
            image_id
        })
    }

    const handleFavorite = (item: ArtPreview, isFavorite: boolean) => {
        isFavorite ? dispatch(removeFavorite(item)) : dispatch(addFavorite(item))
    }

    const handleSearchPress = () => {
        if (isSearching) setSearchResults(undefined)
        setIsSearching(!isSearching)
    }

    const handleLoadMoreData = () => {
        if (isFetching || isSearching) return;

        setIsFetching(true)
        if (artList) {
            dashboardPresenter.getMoreArtWorks()
                .then((newData) => {
                    setArtList([...artList, ...newData])
                    setIsFetching(false)
                })
                .catch((error: AxiosError) => {
                    setIsFetching(false)
                    setError(error.message)
                    setShowError(true)
                })
        }
    }

    const handleSearch = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (e.nativeEvent.text === '') return;
        setIsFetching(true)
        dashboardPresenter.getArtworksBySearch(e.nativeEvent.text)
            .then((data) => {
                if (data.length > 0) {
                    setSearchResults(data)
                }
                else {
                    setSearchResults([])
                }
            })
            .catch((error) => {
                setError(error.message)
                setShowError(true)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }

    const renderHeaderTitle = () => {
        return (
            <AnimatedTextInput
                textContentType='name'
                placeholder='Search...'
                placeholderTextColor='grey'
                style={styles.textInput}
                onSubmitEditing={handleSearch}
                entering={StretchInX.duration(300)}
                exiting={StretchOutX.duration(300)}
            />
        )
    }

    const renderFooter = () => {
        return (
            <Spinner />
        )
    }
    const renderEmptySearchMessage = () => {
        return (
            <View style={styles.textContainer}>
                <Text>No data found by search</Text>
            </View>
        )
    }

    const renderEmptyListComponent = () => {
        if (isSearching) {
            if (isFetching) {
                return (<Spinner />)
            }
            else if (searchResults?.length === 0) {
                return renderEmptySearchMessage()
            } else {
                return (<></>)
            }
        }
        return (<Spinner />)
    }

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View style={styles.headerContainer}>
                <Header title={!isSearching ? route.name : ''}
                    headerTitleAlign='left'
                    headerTitle={isSearching ? renderHeaderTitle : undefined}
                    headerTitleContainerStyle={{ flexGrow: 10 }}
                    headerRightContainerStyle={{ flexGrow: 1 }}
                    headerRight={() =>
                        <Icon name={isSearching ? 'close' : 'magnify'} size={32} color={colors.primary} onPress={handleSearchPress} />}
                />
            </View>
            {<ErrorModal visible={showError} error={error} setState={setShowError} />}
            {(artList || (isSearching && searchResults)) ?
                <FlatList
                    bounces={false}
                    ref={flalistRef}
                    data={isSearching ? searchResults : artList}
                    renderItem={({ item }) => (
                        <CardComponent
                            item={item}
                            handleNavigation={navigateToDetail}
                            handleFavorite={handleFavorite}
                        />
                    )}
                    keyExtractor={(item) => item.image_id}
                    contentContainerStyle={{ paddingBottom: 8, marginHorizontal: 8, flexGrow: 1 }}
                    onEndReachedThreshold={0}
                    onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && !isFetching) {
                            handleLoadMoreData()
                            setOnEndReachedCalledDuringMomentum(true)
                        }
                    }}
                    ListFooterComponent={(isFetching && !isSearching) ? renderFooter : undefined}
                    ListEmptyComponent={renderEmptyListComponent}
                /> :
                <Spinner />
            }

        </View>

    )
}

const styles = StyleSheet.create({
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    headerContainer: {
        justifyContent: 'space-between',
        paddingRight: 8
    },
    textContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    }
})