import React, { useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "@/screens/SignInScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, HOME } from "@/constants/routes";
import BottomTabNavigation from "@/components/BottonTabNavigation";
import { UserContext } from "@/contexts";

const Stack = createStackNavigator();

const Routes = () => {
  const { state } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.userToken ? (
          <Stack.Screen name={HOME} component={BottomTabNavigation} />
        ) : (
          <>
            <Stack.Screen name={SIGN_IN_ROUTE} component={SignInScreen} />
            <Stack.Screen name={SIGN_UP_ROUTE} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
