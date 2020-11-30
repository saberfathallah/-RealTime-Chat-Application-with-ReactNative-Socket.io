import api from "@/utils/api";

const getAllConversationsService = async () => {
  const result = await api.get("/conversations");

  return result.data;
};

export default getAllConversationsService;
