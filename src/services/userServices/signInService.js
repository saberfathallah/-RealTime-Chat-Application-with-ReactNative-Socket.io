import api from "@/utils/api";

const signInService = async (userInputs) => {
  const result = await api.post(`/users/signIn`, { ...userInputs });
  return result.data;
};

export default signInService;
