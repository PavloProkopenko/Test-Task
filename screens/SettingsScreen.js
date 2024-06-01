import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Back from "../assets/img/back_arrow.png"; 
import UserIcon from "../assets/img/exist_user.png"; 
import LanguageIcon from "../assets/img/language_icon.png"; 
import LogoutIcon from "../assets/img/logout_icon.png"; 

import SignInScreen from "./SignInScreen";
import LanguageScreen from "./LanguagesScreen";


const ProfileScreen = () => {
  const [userName, setUsername] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("username");
      setUsername(storedName);
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(resetToken());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={Back} style={styles.backArrow} />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.profileSection}>
        <Image source={UserIcon} style={styles.profileIcon} />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic</Text>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => navigation.navigate("Language")}
        >
          <Image source={LanguageIcon} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other</Text>
        <TouchableOpacity style={styles.sectionItem} onPress={handleLogout}>
          <Image source={LogoutIcon} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 56,
  },
  backArrow: {
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 68,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
  },
  profileIcon: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#06070A",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 10,
    color: "#606773",
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  sectionText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
