import api from "@/utils/api";

const signUp = async (user) => {
  const result = await api.post(`/users/signUp`, user);

  return result.data;
};
export default signUp;
