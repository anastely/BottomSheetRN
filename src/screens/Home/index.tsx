import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme, Pressable} from 'react-native';
import MoodPicker from '../../Components/MoodPicker';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

interface HomeProps {}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Home: React.FC<HomeProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1E2532' : '#ffffff',
  };
  const textStyle = {
    color: isDarkMode ? '#ffffff' : '#1E2532',
  };
  const boxStyle = {
    borderColor: isDarkMode ? '#343F54' : '#d9d9d9',
  };

  const toggleMood = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={[styles.content]}>
        <Text style={[styles.text, textStyle]}>Hi, Anas</Text>
        <AnimatedPressable
          onPress={toggleMood}
          style={[styles.moodBox, boxStyle]}>
          <View>
            <Text style={[styles.text, textStyle, {fontWeight: '800'}]}>
              Mood
            </Text>
            <Text style={[styles.text, textStyle]}>Good</Text>
          </View>
          <View style={styles.smileFaceBox}>
            <Text style={[styles.text, styles.smileFace]}>😃</Text>
          </View>
        </AnimatedPressable>
      </View>
      {/* mood picker */}
      {isOpen && (
        <>
          <Animated.View
            style={styles.sheet}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown.delay(200)}>
            <MoodPicker onPickMood={() => {}} />
          </Animated.View>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut.delay(200)}
            style={styles.backdrop}
            onPress={toggleMood}
          />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  moodBox: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    height: 100,
    // backgroundColor: '#313c52',
    marginVertical: 20,
  },
  text: {
    fontSize: 25,
    color: '#fff',
  },
  smileFaceBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#11A098',
  },
  smileFace: {
    fontSize: 40,
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    height: 300,
    width: '100%',
    position: 'absolute',
    bottom: -50 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});
