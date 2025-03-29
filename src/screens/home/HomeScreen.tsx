import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchVideos, setStartIndex} from '../../redux/slices/videoSlice';
import Card from '../../components/Card';
import {Colors} from '../../configs/Colors';
import {VideoType} from '../../types/video';
import {DynamicHeader} from '../../components/DynamicHeader';
import {verticalScale} from '../../configs/ScalingSize';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../navigations/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/Loading';
import ErrorUI from '../../components/ErrorUI';
import useToggleState from '../../hooks/useToggleState';

const HomeScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const {toggle: refreshing, setToggle: setRefreshing} = useToggleState();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Redux state
  const {
    isLoading,
    videos,
    error,
    startIndex,
    limit,
    isLoadingMore,
    totalCount,
  } = useSelector((state: RootState) => state.videos);

  // Effect to fetch videos
  useEffect(() => {
    dispatch(fetchVideos({startIndex, limit}));
  }, [dispatch, startIndex, limit]);

  // Refresh control handler
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchVideos({startIndex: 0, limit})); // Reset startIndex to fetch fresh data
    setRefreshing(false);
  };

  // Load more videos
  const handleLoadMore = () => {
    if (totalCount > startIndex + limit && !isLoadingMore) {
      dispatch(setStartIndex(startIndex + limit)); // Increase startIndex by limit
    }
  };

  // Viewability configuration for video playback
  const viewabilityConfig = {
    itemVisiblePercentThreshold: verticalScale(50),
  };

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: any[]}) => {
    if (viewableItems.length > 0) {
      setPlayingIndex(viewableItems[0].index);
    }
  };

  // Navigate to video details
  const handleItemSelect = (item: VideoType) => {
    if (item?.videoUrl)
      navigation.navigate(SCREENS.videoDetails, {video: item});
  };

  // Render loading or error UI
  const renderLoadingOrError = () => {
    if (isLoading) return <Loading text="Loading..." />;
    return <ErrorUI text={`Error message: ${error}`} />;
  };

  // Render individual video item
  const renderItems = useCallback(
    ({item, index}: {item: VideoType; index: number}) => (
      <Card
        username={item.username}
        description={item.description}
        id={item.id.toString()}
        imageUrl={item.imageUrl}
        videoUrl={item.videoUrl || ''}
        isPlayVideo={index === playingIndex} // Compare index with playingIndex
        onPress={() => handleItemSelect(item)}
      />
    ),
    [playingIndex],
  );

  // Main content rendering
  const content =
    isLoading || error ? (
      renderLoadingOrError()
    ) : (
      <FlatList
        refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={flatListRef}
        contentContainerStyle={styles.listContainer}
        data={videos}
        renderItem={renderItems}
        keyExtractor={item => String(item.id)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={{margin: 5}} />}
        onEndReached={handleLoadMore}
        ListFooterComponent={() =>
          isLoadingMore && <ActivityIndicator size={'large'} />
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {useNativeDriver: false},
        )}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader
        title="Shrinkable Header: Image and Video Profile"
        value={scrollOffsetY}
      />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    padding: 5,
  },
});

export default HomeScreen;
