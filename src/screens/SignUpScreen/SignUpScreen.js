import React, { useContext } from "react";
import { TextInput, ScrollView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import "yup-phone";
import { Formik } from "formik";
import { Button } from "react-native-elements";

import ErrorMessage from "@/components/ErrorMessage";
import {
  MIN_PASSWORD,
  MAX_PASSWORD,
  AGE_ERROR_MESSAGE,
  PASSWORD_MAX_ERROR_MESSAGE,
  CONFIRMATION_PASSWORD_ERROR_MESSAGE,
} from "@/constants/validationForm";
import { UserContext } from "@/contexts";

const SignUpScreen = () => {
  const { signUp } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        age: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        contry: "",
      }}
      onSubmit={(values) => signUp(values)}
      validationSchema={yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup.string().phone("IN").required(),
        age: yup.number().required().typeError(AGE_ERROR_MESSAGE),
        contry: yup.string().required(),
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(MIN_PASSWORD)
          .max(MAX_PASSWORD, PASSWORD_MAX_ERROR_MESSAGE)
          .required(),
        passwordConfirmation: yup
          .string()
          .oneOf(
            [yup.ref("password"), null],
            CONFIRMATION_PASSWORD_ERROR_MESSAGE
          ),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.title}>Inscription</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.firstName}
              style={styles.inputStyle}
              onChangeText={handleChange("firstName")}
              onBlur={() => setFieldTouched("firstName")}
              placeholder="first name"
            />
            {touched.firstName && errors.firstName && (
              <ErrorMessage error={errors.firstName} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.lastName}
              style={styles.inputStyle}
              onChangeText={handleChange("lastName")}
              onBlur={() => setFieldTouched("lastName")}
              placeholder="last name"
            />
            {touched.lastName && errors.lastName && (
              <ErrorMessage error={errors.lastName} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.age}
              style={styles.inputStyle}
              onChangeText={handleChange("age")}
              onBlur={() => setFieldTouched("age")}
              placeholder="age"
            />
            {touched.age && errors.age && <ErrorMessage error={errors.age} />}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.phoneNumber}
              style={styles.inputStyle}
              onChangeText={handleChange("phoneNumber")}
              onBlur={() => setFieldTouched("phoneNumber")}
              placeholder="phone number"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <ErrorMessage error={errors.phoneNumber} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.contry}
              style={styles.inputStyle}
              onChangeText={handleChange("contry")}
              onBlur={() => setFieldTouched("contry")}
              placeholder="contry"
            />
            {touched.contry && errors.contry && (
              <ErrorMessage error={errors.contry} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.email}
              style={styles.inputStyle}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <ErrorMessage error={errors.email} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.password}
              style={styles.inputStyle}
              onChangeText={handleChange("password")}
              placeholder="Password"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <ErrorMessage error={errors.password} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={values.passwordConfirmation}
              style={styles.inputStyle}
              onChangeText={handleChange("passwordConfirmation")}
              placeholder="passwordConfirmation"
              onBlur={() => setFieldTouched("passwordConfirmation")}
              secureTextEntry={true}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <ErrorMessage error={errors.passwordConfirmation} />
            )}
          </View>
          <Button
            color="#3740FE"
            title="sign up"
            disabled={!isValid}
            onPress={handleSubmit}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#09B7F8",
    padding: 12,
    marginBottom: 8,
  },
  title: { textAlign: "center", marginBottom: 15, fontSize: 30 },
  inputContainer: {
    marginBottom: 15,
  },
});

export default SignUpScreen;
