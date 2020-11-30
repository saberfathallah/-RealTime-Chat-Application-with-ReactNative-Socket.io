import { v4 as uuidv4 } from "uuid";

export const formatSendMessage = (conversations, message, id) =>
  conversations.length > 0
    ? conversations.map((conv) => {
        if (conv.user.id === id) {
          return {
            ...conv,
            conversation: [
              ...conv.conversation,
              {
                text: message.text,
                _id: uuidv4(),
                createdAt: message.createdAt,
                user: {
                  _id: message.id,
                  name: message.firstName,
                  avatar: "https://facebook.github.io/react/img/logo_og.png",
                },
              },
            ],
          };
        }
        return conv;
      })
    : [
        {
          user: {
            id,
          },
          conversation: [
            {
              text: message.text,
              _id: uuidv4(),
              createdAt: message.createdAt,
              user: {
                _id: message.id,
                name: message.firstName,
                avatar: "https://facebook.github.io/react/img/logo_og.png",
              },
            },
          ],
        },
      ];
