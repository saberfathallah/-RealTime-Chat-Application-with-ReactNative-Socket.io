import api from "@/utils/api";

const getFriendsListService = async () => {
  const result = await api.get('/invitations/friends');
  return result.data;
};

export default getFriendsListService;