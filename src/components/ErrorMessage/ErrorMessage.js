import React from "react";
import { Text } from "react-native";

const ErrorMessage = ({ error }) => (
    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
    {error}
  </Text>
);
export default ErrorMessage;
