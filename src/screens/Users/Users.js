import React, { useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";

import { UserContext } from "@/contexts";
import UserItem from "@/components/UserItem";

const Users = () => {
  const {
    getAllUsers,
    state: { users },
  } = useContext(UserContext);

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <ScrollView>
      {users.map((user) => (
        <View key={user.id}>
          <UserItem user={user} />
        </View>
      ))}
    </ScrollView>
  );
};
export default Users;
