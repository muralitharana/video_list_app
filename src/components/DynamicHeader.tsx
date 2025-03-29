import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {Colors} from '../configs/Colors';
import {verticalScale} from '../configs/ScalingSize';

const HEADER_MAX_HEIGHT = verticalScale(200);
const HEADER_MIN_HEIGHT = verticalScale(70);
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface DynamicHeaderProps {
  value: Animated.Value;
  title: string;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = props => {
  const {value, title} = props;
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [Colors.primary, Colors.greyLight],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
