import React, { useContext } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
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
  const inputStyle = {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  };
  const { signIn } = useContext(UserContext);

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async values => {
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
            <Button
              color="#3740FE"
              title="sign in"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <Button
        title="sign up"
        onPress={() => navigation.navigate(SIGN_UP_ROUTE)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 50,
  },
});

export default SignInScreen;
