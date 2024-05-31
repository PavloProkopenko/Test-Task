import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Back from "../assets/img/back_arrow.png";
import PhoneIcon from "../assets/img/phone.png";
import User from "../assets/img/exist_user.png";
import DeleteIcon from "../assets/img/delete_arrow.png";

const Line = () => <View style={styles.line} />;

const PinCodeScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) {
        setUserEmail(storedEmail);
        setIsFirstTime(false);
      } else {
        setIsFirstTime(true);
      }
    };

    checkUser();
  }, []);

  const handlePinPress = (value) => {
    if (pin.length < 5) {
      setPin((prevPin) => prevPin + value);
    }
  };

  const handleDeletePress = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleContinuePress = async () => {
    if (isFirstTime) {
      await AsyncStorage.setItem("userPin", pin);
      navigation.navigate("Home");
    } else {
      const storedPin = await AsyncStorage.getItem("userPin");
      if (storedPin === pin) {
        navigation.navigate("Home");
      } else {
        // TODO: handle invalid PIN
      }
    }
  };

  const handleChangeAccount = () => {
    navigation.navigate("SignIn");
  };

  const renderCircles = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <View
          key={index}
          style={[styles.circle, index < pin.length && styles.filledCircle]}
        />
      ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style = {styles.backButton}>
        <Image source={Back} style={styles.backArrow} />
      </TouchableOpacity>
      {isFirstTime ? (
        <>
          <Image source={PhoneIcon} style={styles.icon} />
          <Text style={styles.title}>Create a Pin code</Text>
          <Text style={styles.subtitle}>enter 5 digit code:</Text>
        </>
      ) : (
        <>
          <Image source={User} style={styles.icon} />
          <Text style={styles.title}>Enter your PIN</Text>
          <Text style={styles.subtitle}>{userEmail}</Text>
          <TouchableOpacity onPress={handleChangeAccount}>
            <Text style={styles.changeAccountText}>Change account</Text>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.circlesContainer}>{renderCircles()}</View>
      <Line />
      <View style={styles.keypadContainer}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keypadButton}
              onPress={() => item && handlePinPress(item)}
            >
              <Text style={styles.keypadButtonText}>{item}</Text>
            </TouchableOpacity>
          )
        )}
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={handleDeletePress}
        >
          <Image source={DeleteIcon} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
      <Line />
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinuePress}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f3f5",
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#606773",
    marginBottom: 20,
  },
  changeAccountText: {
    fontSize: 16,
    color: "#FA8A34",
    marginBottom: 20,
  },
  circlesContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CED5E0",
    backgroundColor: "#C1C4CB",
    margin: 5,
  },
  filledCircle: {
    backgroundColor: "#FA8A34",
    borderColor: "#FA8A34",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  keypadButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  keypadButtonText: {
    fontWeight: "700",
    fontSize: 28,
  },
  continueButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FA8A34",
  },
  continueButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  icon: {
    height: 48,
    width: 48,
  },
  line: {
    height: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#EBEFF5",
    marginBottom: 16,
  },
  deleteIcon: {
    width: 23,
    height: 17,
  },
  backArrow: {
    marginTop: 56,
    marginLeft: 12,
    height: 24,
    width: 24,
  },
  backButton: {
    position: 'absolute',
    left: 20
  },
});

export default PinCodeScreen;
