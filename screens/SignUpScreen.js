import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import Back from '../assets/img/back_arrow.png';
import User from '../assets/img/createUser.png';

const Line = () => <View style = {styles.line}/>

const SignUpScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style = {styles.backArrow}/>
        </TouchableOpacity>
        <View style = {styles.formContainer}>
          <View style = {styles.header}>
            <Image source={User} style = {styles.user} />
            <View style = {{flexDirection: 'column', marginLeft: 12}}>
              <Text style = {styles.title}>Sign up</Text>
              <Text style = {styles.subtitle}>Personal account</Text>
            </View>
          </View>
          <Line />
          <View style = {styles.form}>
            <Text style = {styles.subtitle}>Name</Text>
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
            <Text style = {styles.subtitle}>Email</Text>
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
            <Text style = {styles.subtitle}>Password</Text>
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
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
              defaultValue=""
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}


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
    marginTop: 32,
    width: '100%',
    height: 800,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    backgroundColor: '#fff'
  },
  user: {
    width: 48,
    height: 51,
  },
  header: {
    flexDirection: 'row',
    margin: 16
  },
  title: {
    fontSize: 15,
    fontWeight: '500'
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    textAlign: 'left',
  },
  input: {
    width: 343,
    height: 56,
    borderWidth: 1,
    borderColor:'#CED5E0',
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 343,
    radius: 16,
    backgroundColor: '#FA8A34',
    marginBottom: 24,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignUpScreen;
