import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Animated, {Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS} from 'react-native-reanimated';

import SplashScreen from './screens/SplashScreenView';
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const opacity = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.linear,
      }, (isFinished) => {
        if (isFinished) {
          runOnJS(setIsShowSplash)(false);
        }
      });
    }, 1000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <NavigationContainer>
      {isShowSplash ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          <SplashScreen />
        </Animated.View>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
