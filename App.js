import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import SplashScreen from "./screens/SplashScreenView";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PinCodeScreen from "./screens/PinCodeScreen";
import HomeScreen from "./screens/HomeScreen";
import LanguageScreen from "./screens/LanguagesScreen"

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Welcome">
    <AuthStack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="PinCode">
    <MainStack.Screen
      name="PinCode"
      component={PinCodeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Language"
      component={LanguageScreen}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("User Token: ", userToken);
      if (userToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    setTimeout(() => {
      opacity.value = withTiming(
        0,
        {
          duration: 1000,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setIsShowSplash)(false);
          }
        }
      );
    }, 1000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            {isShowSplash ? (
              <Animated.View style={[styles.container, animatedStyle]}>
                <SplashScreen />
              </Animated.View>
            ) : (
              <>
                {!isLoggedIn ? (
                  <AuthStackScreen />
                ) : (
                  <MainStackScreen />
                )}
              </>
            )}
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
