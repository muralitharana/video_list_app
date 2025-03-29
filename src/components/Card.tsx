import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  PressableProps,
} from 'react-native';
import {VideoType} from '../types/video';
import {Colors} from '../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import VideoPlayer from './VideoPlayer';

interface CardProps extends VideoType {
  isPlayVideo: boolean;
}

const Card: React.FC<CardProps & PressableProps> = props => {
  const {username, description, videoUrl, isPlayVideo, imageUrl, ...rest} =
    props;

  return (
    <Pressable {...rest} style={styles.cardContainer}>
      <View style={styles.header}>
        {imageUrl && (
          <Image
            source={{uri: imageUrl}}
            resizeMode="cover"
            style={styles.avatar}
          />
        )}
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      {videoUrl && (
        <View style={styles.videoContainer}>
          <VideoPlayer
            isPlaying={isPlayVideo}
            resizeMode="cover"
            source={{uri: videoUrl}}
            style={styles.video}
            playInBackground={false}
            playWhenInactive={false}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: Colors.secondary,
  },
  header: {
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(100),
    marginRight: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  username: {
    color: Colors.primary,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  description: {
    color: Colors.primary,
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  videoContainer: {
    borderRadius: 10,
  },
  video: {
    width: '100%', // Full width
    height: verticalScale(200), // Fixed height for videos
    borderRadius: 10,
  },
});

export default Card;
