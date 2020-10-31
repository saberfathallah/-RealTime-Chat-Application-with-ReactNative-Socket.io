import React from "react";
import { Text } from "react-native";

const ErrorMessage = ({ error }) => (
  <Text style={{ color: "#FF0D10", textAlign: "center" }}>
    {error}
  </Text>
);
export default ErrorMessage;
