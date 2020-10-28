import api from "@/utils/api";

const getAllUsersService = async () => {
  const result = await api.get('/users');
  return result.data;
};

export default getAllUsersService;