import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setPin } from "../redux/reducers/authReducer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Back from "../assets/img/back_arrow.png";
import User from "../assets/img/exist_user.png";
import EyeIcon from "../assets/img/orange_eye_icon.png";
import ErrorIcon from "../assets/img/error_icon.png";

const Line = () => <View style={styles.line} />;

const SignInScreen = ({ navigation }) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);

      console.log("Sending request with:", {
        username: username,
        password: password,
      });

      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });
      console.log(response.data);

      dispatch(setToken(response.data.token));
      setLoading(false);

      navigation.navigate("PinCode");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Back} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Image source={User} style={styles.user} />
          <View style={{ flexDirection: "column", marginLeft: 12 }}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Personal account</Text>
          </View>
        </View>
        <Line />
        <ScrollView style={styles.form}>
          {error && (
            <Text style={styles.errorMessage}>
              Error: Invalid E-mail or Password
            </Text>
          )}
          <Text style={styles.label}>Username</Text>
          <View style={[styles.inputContainer, error && styles.errorBorder]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setEmail}
              value={username}
            />
            {error && <Image source={ErrorIcon} style={styles.errorIcon} />}
          </View>

          <View style={styles.passwordLabelContainer}>
            <Text style={styles.label}>Password</Text>
            {error && <Text style={styles.forgotText}>Forgot?</Text>}
          </View>
          <View style={[styles.passwordContainer, error && styles.errorBorder]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={EyeIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
            {error && <Image source={ErrorIcon} style={styles.errorIcon} />}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleLogin}
            >
              <Text style={styles.continueButtonText}>
                {loading ? "Loading..." : "Continue"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  backArrow: {
    marginTop: 56,
    marginLeft: 12,
    height: 24,
    width: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    width: "100%",
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  user: {
    width: 48,
    height: 48,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#606773",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#EBEFF5",
    marginBottom: 16,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CED5E0",
    borderRadius: 16,
    marginVertical: 5,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CED5E0",
    borderRadius: 16,
    marginVertical: 5,
    paddingHorizontal: 16,
    height: 56,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    width: 18,
    height: 12,
  },
  buttonContainer: {
    marginTop: 36,
  },
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FA8A34",
    marginBottom: 16,
  },
  continueButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "650",
  },
  createButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    backgroundColor: "transparent",
  },
  createButtonText: {
    color: "#FA8A34",
    fontSize: 15,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "400",
    color: "#606773",
    marginLeft: 16,
    marginVertical: 12,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 16,
    fontWeight: "500",
  },
  errorBorder: {
    borderColor: "#FA8A34",
  },
  errorIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  forgotText: {
    color: "#FA8A34",
    fontSize: 15,
    textAlign: "right",
    fontWeight: "400",
    marginRight: 16,
  },
  passwordLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SignInScreen;
