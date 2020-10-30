import api from "@/utils/api";

const getFriendsListService = async () => {
  const result = await api.get('/invitations/getFriendsList');

  return result.data;
};

export default getFriendsListService;