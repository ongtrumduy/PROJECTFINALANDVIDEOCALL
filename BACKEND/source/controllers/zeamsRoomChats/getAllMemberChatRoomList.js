import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let GetAllMemberChatRoomList = async (req, res) => {
//   console.log(req.body);
  let resGetAllMemberChatRoom = await zeamsRoomChatsContents.responseAllMemberChatRoomList(
    req.body
  );
//   console.log(resGetAllMemberChatRoom);
  res.send(resGetAllMemberChatRoom);
};

module.exports = GetAllMemberChatRoomList;
