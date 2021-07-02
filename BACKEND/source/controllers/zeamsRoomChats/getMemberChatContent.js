import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let GetMemberChatContent = async (req, res) => {
    console.log(req.body);
  let resGetMemberChatContent = await zeamsRoomChatsContents.responseMemberChatContent(
    req.body
  );
//   console.log(resGetMemberChatContent);
  res.send(resGetMemberChatContent);
};

module.exports = GetMemberChatContent;
