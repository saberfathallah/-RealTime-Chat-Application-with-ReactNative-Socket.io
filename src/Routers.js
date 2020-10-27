import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "@/screens/SignInScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/constants/routes";

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={SIGN_IN_ROUTE}>
      <Stack.Screen name={SIGN_IN_ROUTE} component={SignInScreen} />
      <Stack.Screen name={SIGN_UP_ROUTE} component={SignUpScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Routes;
