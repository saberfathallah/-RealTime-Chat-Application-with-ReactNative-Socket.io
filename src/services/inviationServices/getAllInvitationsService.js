import api from "@/utils/api";

const getAllInvitationService = async () => {
  const result = await api.get('/invitations/getAllInvitation');

  return result.data;
};

export default getAllInvitationService;