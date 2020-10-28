import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Users from "@/screens/Users";
import Friends from "@/screens/Friends";
import Invitations from "@/screens/Invitations";
import Messages from "@/screens/Messages";
import { FRIENDS, USERS, INVITATIONS, MESSAGES } from "@/constants/routes";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
        style: {
          backgroundColor: '#000000',
        },
        activeTintColor: '#f7c505',
        inactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen name={FRIENDS} component={Friends} />
      <Tab.Screen name={USERS} component={Users} />
      <Tab.Screen name={INVITATIONS} component={Invitations} />
      <Tab.Screen name={MESSAGES} component={Messages} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;

