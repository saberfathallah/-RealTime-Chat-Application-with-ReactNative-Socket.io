import React, { useContext, useEffect } from "react";

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
    <>
      {users.map((user) => (
        <UserItem user={user} />
      ))}
    </>
  );
};
export default Users;
