export const isSendInvitationFunction = (listSendInvitation, user) => {
  const ids = listSendInvitation.map(
    (invitations) => invitations.userSendInvitation.id
  );
  const isSendInvitation = ids.includes(user.id);
  return isSendInvitation;
};
export const isInvitedFunction = (invitations, user) => {
  const ids = invitations.map((invitations) => invitations.idInvited);
  const isInvited = ids.includes(user.id);
  return isInvited;
};
