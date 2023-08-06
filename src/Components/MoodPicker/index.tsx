import React, {useState} from 'react';
import {Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import {Moods} from '../../Data/moods';
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutLeft,
  SlideInDown,
  useSharedValue,
} from 'react-native-reanimated';

interface MoodPickerProps {
  onPickMood: (selectedMood: {mood: string; description: string}) => void;
}
const {width: windowWidth} = Dimensions.get('window');
const gap = 15;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MoodPicker: React.FC<MoodPickerProps> = ({onPickMood}) => {
  const [selectedMood, setSelectedMood] = useState({
    mood: Moods[0].mood,
    description: Moods[0].description,
  });

  const selectedMoodVal = useSharedValue('');

  const onChoose = (mood: string, description: string) => {
    selectedMoodVal.value = mood;
    setSelectedMood({mood, description});
  };

  return (
    <>
      <Animated.Text
        entering={FadeInLeft.duration(500).delay(500)}
        exiting={FadeOutLeft.duration(500).delay(500)}
        style={styles.header}>
        How are you feeling today?
      </Animated.Text>
      <Animated.View style={styles.moodBox}>
        {Moods.map(({mood, description}) => (
          <AnimatedPressable
            key={mood}
            entering={BounceIn.duration(400).delay(600)}
            exiting={BounceOut}
            style={[
              styles.mood,
              {
                borderColor: selectedMood?.mood === mood ? '#0c8fcc' : '#000',
              },
            ]}
            // layout={Layout.easing(Easing.ease).delay(index * 100)}
            onPress={() => onChoose(mood, description)}>
            <Text style={styles.label}>{mood}</Text>
          </AnimatedPressable>
        ))}
      </Animated.View>
      <Animated.Text
        entering={FadeIn.duration(400).delay(400)}
        exiting={FadeOut.duration(400).delay(400)}
        style={styles.desc}>
        {selectedMood?.description}
      </Animated.Text>
      <Animated.View entering={SlideInDown.duration(350).delay(350)}>
        <Pressable
          onPress={() => onPickMood(selectedMood)}
          style={({pressed}) => [
            {
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
            },
            styles.setBox,
          ]}>
          <Text style={styles.header}>Set</Text>
        </Pressable>
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
    justifyContent: 'center',
    padding: 20,
  },
  mood: {
    height: (windowWidth - 10 * gap) / 5,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 30,
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
    // marginVertical: 15,
    color: '#0c1836',
  },
  setBox: {
    marginTop: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
});
