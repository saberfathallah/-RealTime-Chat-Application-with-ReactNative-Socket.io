import api from "@/utils/api";

const getListUserInvited = async () => {
  const result = await api.get('/invitations/getListUserInvited');

  return result.data;
};

export default getListUserInvited;