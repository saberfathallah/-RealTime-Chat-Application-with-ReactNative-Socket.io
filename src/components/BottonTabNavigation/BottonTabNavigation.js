import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Users from "@/screens/Users";
import Friends from "@/screens/Friends";
import Invitations from "@/screens/Invitations";
import Messages from "@/screens/Messages";
import Conversation from "@/screens/Conversation";
import { FRIENDS, USERS, INVITATIONS, MESSAGES, CONVERSATION } from "@/constants/routes";
import HeaderComponent from "@/components/Header";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {

  return (
    <>
      <HeaderComponent navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: "#000000",
          },
          activeTintColor: "#f7c505",
          inactiveTintColor: "#FFFFFF",
        }}
      >
        <Tab.Screen name={FRIENDS} component={Friends} />
        <Tab.Screen name={USERS} component={Users} />
        <Tab.Screen name={INVITATIONS} component={Invitations} />
        <Tab.Screen name={MESSAGES} component={Messages} />
        <Tab.Screen name={CONVERSATION} component={Conversation} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigation;
