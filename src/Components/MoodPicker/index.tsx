import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Moods} from '../../Data/moods';
import Animated, {
  BounceIn,
  FadeInLeft,
  FadeOutLeft,
} from 'react-native-reanimated';

interface MoodPickerProps {
  onPickMood: (mood: string) => void;
}
const {width: windowWidth} = Dimensions.get('window');
const gap = 15;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const MoodPicker: React.FC<MoodPickerProps> = ({onPickMood}) => {
  return (
    <>
      <Animated.Text
        entering={FadeInLeft.duration(500).delay(500)}
        exiting={FadeOutLeft.duration(500).delay(500)}
        style={styles.header}>
        How are you feeling today?
      </Animated.Text>
      <Animated.View style={styles.moodBox}>
        {Moods.map(({mood}) => (
          <AnimatedTouchableOpacity
            key={mood}
            style={styles.mood}
            entering={BounceIn.duration(400).delay(600)}
            onPress={() => onPickMood(mood)}>
            <Text style={styles.label}>{mood}</Text>
          </AnimatedTouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '500',
  },
  moodBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
    flex: 1,
    height: 110,
    justifyContent: 'center',
    padding: 20,
  },
  mood: {
    height: (windowWidth - 10 * gap) / 5,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
  },
});
