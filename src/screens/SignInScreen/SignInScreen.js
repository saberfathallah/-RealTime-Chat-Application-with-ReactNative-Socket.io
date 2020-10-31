import React, { useContext } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";

import * as yup from "yup";
import { Formik } from "formik";

import ErrorMessage from "@/components/ErrorMessage";
import {
  MIN_PASSWORD,
  MAX_PASSWORD,
  PASSWORD_MAX_ERROR_MESSAGE,
} from "@/constants/validationForm";
import { SIGN_UP_ROUTE, HOME } from "@/constants/routes";
import { UserContext } from "@/contexts";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(UserContext);

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await signIn(values);
          navigation.navigate(HOME);
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(MIN_PASSWORD)
            .max(MAX_PASSWORD, PASSWORD_MAX_ERROR_MESSAGE)
            .required(),
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
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
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

            <Button
              title="sign in"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate(SIGN_UP_ROUTE)}
      >
        sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  signUpText: {
    color: "#09B7F8",
    textAlign: "center",
    fontSize: 25,
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

export default SignInScreen;
