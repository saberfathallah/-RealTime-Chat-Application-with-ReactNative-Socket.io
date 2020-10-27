import React, { useContext } from "react";
import { TextInput, Button, ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";
import "yup-phone";
import { Formik } from "formik";

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
  const inputStyle = {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  };
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
          <TextInput
            value={values.firstName}
            style={inputStyle}
            onChangeText={handleChange("firstName")}
            onBlur={() => setFieldTouched("firstName")}
            placeholder="first name"
          />
          {touched.firstName && errors.firstName && (
            <ErrorMessage error={errors.firstName} />
          )}
          <TextInput
            value={values.lastName}
            style={inputStyle}
            onChangeText={handleChange("lastName")}
            onBlur={() => setFieldTouched("lastName")}
            placeholder="last name"
          />
          {touched.lastName && errors.lastName && (
            <ErrorMessage error={errors.lastName} />
          )}
          <TextInput
            value={values.age}
            style={inputStyle}
            onChangeText={handleChange("age")}
            onBlur={() => setFieldTouched("age")}
            placeholder="age"
          />
          {touched.age && errors.age && <ErrorMessage error={errors.age} />}
          <TextInput
            value={values.phoneNumber}
            style={inputStyle}
            onChangeText={handleChange("phoneNumber")}
            onBlur={() => setFieldTouched("phoneNumber")}
            placeholder="phone number"
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <ErrorMessage error={errors.phoneNumber} />
          )}
          <TextInput
            value={values.contry}
            style={inputStyle}
            onChangeText={handleChange("contry")}
            onBlur={() => setFieldTouched("contry")}
            placeholder="contry"
          />
          {touched.contry && errors.contry && (
            <ErrorMessage error={errors.contry} />
          )}
          <TextInput
            value={values.email}
            style={inputStyle}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            placeholder="E-mail"
          />
          {touched.email && errors.email && (
            <ErrorMessage error={errors.email} />
          )}
          <TextInput
            value={values.password}
            style={inputStyle}
            onChangeText={handleChange("password")}
            placeholder="Password"
            onBlur={() => setFieldTouched("password")}
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <ErrorMessage error={errors.password} />
          )}
          <TextInput
            value={values.passwordConfirmation}
            style={inputStyle}
            onChangeText={handleChange("passwordConfirmation")}
            placeholder="passwordConfirmation"
            onBlur={() => setFieldTouched("passwordConfirmation")}
            secureTextEntry={true}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <ErrorMessage error={errors.passwordConfirmation} />
          )}
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
    padding: 50,
  },
});

export default SignUpScreen;
