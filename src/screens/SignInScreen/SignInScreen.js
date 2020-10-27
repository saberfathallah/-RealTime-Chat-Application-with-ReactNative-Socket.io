import React from "react";
import { Text, View, Button } from "react-native";

const SignInScreen = ({ navigation }) => {
  return (
    <View>
      <Text> SignInScreen Screen ! </Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </View>
  );
};

export default SignInScreen;
