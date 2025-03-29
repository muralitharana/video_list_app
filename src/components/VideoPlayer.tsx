import React from 'react';
import Video, {ReactVideoProps} from 'react-native-video';

const VideoPlayer: React.FC<ReactVideoProps & {isPlaying: boolean}> = ({
  isPlaying,
  ...rest
}) => {
  return <Video paused={!isPlaying} {...rest} />;
};

export default VideoPlayer;
