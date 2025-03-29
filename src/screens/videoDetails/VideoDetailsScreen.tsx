import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {VideoType} from '../../types/video';
import {SafeAreaView} from 'react-native-safe-area-context';
import VideoPlayer from '../../components/VideoPlayer';

type RouteParam = {route: {params: {video: VideoType}}};

const VideoDetailsScreen = ({route}: RouteParam) => {
  const {id, username, videoUrl} = route.params?.video;
  return (
    <SafeAreaView style={{flex: 1}}>
      <VideoPlayer
        isPlaying={true}
        source={{uri: videoUrl}}
        fullscreen={true}
        controls={true}
        style={styles.videoPlayer}
        fullscreenOrientation="landscape"
        fullscreenAutorotate={true}
        playInBackground={false}
      />
    </SafeAreaView>
  );
};

export default VideoDetailsScreen;

const styles = StyleSheet.create({
  videoPlayer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
