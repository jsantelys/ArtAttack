import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../navigation/HomeStack'
import { BottomTabParamList } from '../../navigation/BottomTabStack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import DetailPresenter from './DetailPresenter'
import API_PATHS from '../../api/ApiPaths'
import { ArtDetail } from '../../types/ArtInterface'
import ImageViewer from 'react-native-image-zoom-viewer'
import ErrorModal from '../../ui/ErrorModal'

type Props = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'Detail'>,
    BottomTabScreenProps<BottomTabParamList>
>

export default function DetailScreen({ navigation, route }: Props) {

    const { id, image_id } = route.params

    const [detailData, setDetailData] = useState<ArtDetail>()
    const [viewImage, setViewImage] = useState(false)

    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const [imageUrl, setImageUrl] = useState(API_PATHS.getIIFImage(image_id))
    const [errorLoading, setErrorLoading] = useState(false)

    const insets = useSafeAreaInsets()
    const detailPresenter = new DetailPresenter()

    useEffect(() => {
        detailPresenter.getArtWork(id.toString())
            .then((response) => {
                setDetailData(response)
            })
            .catch((error) => {
                setError(error.message)
                setShowError(true)
            })
    }, [])

    const handlePress = () => {
        setViewImage(true)
    }

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            {<ErrorModal visible={showError} error={error} setState={setShowError} />}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 8, marginHorizontal: 8, flexGrow: 1 }}>
                <Pressable onPress={handlePress}>
                    <Animated.Image
                        source={{ uri: imageUrl }}
                        sharedTransitionTag={`detailImage${image_id}`}
                        style={styles.image}
                        onError={({ nativeEvent: { error } }) => {
                            if (error.includes("403") && !errorLoading) {
                                setErrorLoading(true)
                                setImageUrl(API_PATHS.getIIFImage(image_id))
                            }
                        }}
                        onLoad={() => {
                            if (!errorLoading)
                                setImageUrl(API_PATHS.getIFFImageHD(image_id))
                        }}
                    />
                </Pressable>
                {detailData ?
                    <View style={styles.body}>
                        {detailData.title && <Text style={styles.textTitle}>{detailData.title}</Text>}
                        {detailData.date_display && <Text style={styles.textSubTitle}>{detailData.date_display}</Text>}
                        {detailData.artist_title && <Text style={styles.textSubTitle}>{detailData.artist_title}</Text>}
                        {detailData.description &&
                            <Text style={styles.textDescription}>{detailData.description}</Text>}
                        {detailPresenter.formatAdditionalInfo(detailData).map((element, index) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.textTitleSection}>{element[0]}</Text>
                                <Text>{element[1]}</Text>
                            </View>))}
                    </View>
                    : <ActivityIndicator size='large' />
                }
            </ScrollView >

            <Modal
                visible={viewImage}
                transparent={true}
                onRequestClose={() => setViewImage(false)}>
                <ImageViewer
                    imageUrls={[{ url: imageUrl }]}
                    renderIndicator={() => <></>}
                />
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 8
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        opacity: 0.9
    },
    textTitle: {
        fontFamily: 'Libre Baskerville',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16
    },
    textSubTitle: {
        marginBottom: 16
    },
    textDescription: {
        marginBottom: 16,
        fontSize: 14
    },
    section: {
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
        paddingVertical: 8
    },
    textTitleSection: {
        fontWeight: 'bold',
        color: 'black'
    }
})