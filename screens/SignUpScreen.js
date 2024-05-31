import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import Back from '../assets/img/back_arrow.png';
import User from '../assets/img/createUser.png';
import EyeIcon from '../assets/img/eye_icon.png';

const Line = () => <View style={styles.line} />;

const SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Back} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Image source={User} style={styles.user} />
          <View style={{ flexDirection: 'column', marginLeft: 12 }}>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Personal account</Text>
          </View>
        </View>
        <Line />
        <ScrollView style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                maxLength: {
                  value: 64,
                  message: 'Password cannot exceed 64 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
                  message: 'Password must contain upper and lower case letters, a number, and a special character',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={ { flex: 1 }}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
              defaultValue=""
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={EyeIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
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
    width: '100%',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  user: {
    width: 48,
    height: 51,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#606773',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEFF5',
    marginVertical: 8,
  },
  form: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#CED5E0',
    borderRadius: 16,
    padding: 16,
    marginVertical: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CED5E0',
    borderRadius: 16,
    marginVertical: 5,
    paddingHorizontal: 16,
    height: 56,
  },
  eyeIcon: {
    width: 18,
    height: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FA8A34',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: '#606773',
    marginLeft: 16,
  },
});

export default SignUpScreen;
