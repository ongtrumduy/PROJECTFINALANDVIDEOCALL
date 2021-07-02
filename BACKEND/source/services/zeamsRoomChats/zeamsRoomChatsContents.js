import fs from "fs";
import moment from "moment";
import zeamsRoomChats from "./zeamsRoomChats";

class ZeamsRoomChatsContents {
  constructor() {
    let roomchatscontents = fs.readFileSync(
      "../BACKEND/source/databases/zeamsRoomChats/zeamsRoomChatsContents.json"
    );
    if (roomchatscontents.length > 0) {
      this.ZeamsRoomChatsContents = JSON.parse(roomchatscontents);
    } else {
      this.ZeamsRoomChatsContents = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsRoomChats/zeamsRoomChatsContents.json",
      JSON.stringify(this.ZeamsRoomChatsContents),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberRoomChat(roomchatinfor) {
    let newroomchat = {
      RoomChatID: zeamsRoomChats.createNewMemberRoomChat(roomchatinfor),
      MemberID: roomchatinfor.MemberID,
      MemberChatID: roomchatinfor.MemberChatID,
      RoomMemberChatContent: []
    };

    this.ZeamsRoomChatsContents.push(newroomchat);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberChatRoomChat(roomchatinfor) {
    let newroomchat = {
      RoomChatID: zeamsRoomChats.createNewMemberChatRoomChat(roomchatinfor),
      MemberID: roomchatinfor.MemberChatID,
      MemberChatID: roomchatinfor.MemberID,
      RoomMemberChatContent: []
    };

    this.ZeamsRoomChatsContents.push(newroomchat);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewMemberRoomChat(roomchatinfor) {
    let checkCreateNewRoom = false;
    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roommemberitem => {
        return (
          roommemberitem.MemberID === roomchatinfor.MemberID &&
          roommemberitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    if (roommemberindex < 0) {
      checkCreateNewRoom = true;
    }

    return checkCreateNewRoom;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewMemberChatRoomChat(roomchatinfor) {
    let checkCreateNewRoom = false;
    let roommemberchatindex = this.ZeamsRoomChatsContents.findIndex(
      roommemberchatitem => {
        return (
          roommemberchatitem.MemberID === roomchatinfor.MemberChatID &&
          roommemberchatitem.MemberChatID === roomchatinfor.MemberID
        );
      }
    );

    if (roommemberchatindex < 0) {
      checkCreateNewRoom = true;
    }

    return checkCreateNewRoom;
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewMessageToMemberRoomChat(roomchatinfor) {
    let checkCreateNewMemberRoom = this.checkCreateNewMemberRoomChat(
      roomchatinfor
    );

    if (checkCreateNewMemberRoom) {
      this.createNewMemberRoomChat(roomchatinfor);
    }

    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    if (roommemberindex >= 0) {
      let roommembercontent = {
        MemberChattedID: roomchatinfor.MemberID,
        MemberChattedContent: roomchatinfor.MemberChatContent,
        MemberChattedDate: moment().format("HH:mm DD-MM-YYYY")
      };

      this.ZeamsRoomChatsContents[roommemberindex].RoomMemberChatContent.push(
        roommembercontent
      );
    }
    zeamsRoomChats.changeFirstPositionMemberMessage(roomchatinfor);
    zeamsRoomChats.unHiddenedMemberOfAllMemberChatRoomList(roomchatinfor);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewMessageToMemberChatRoomChat(roomchatinfor) {
    let checkCreateNewMemberChatRoom = this.checkCreateNewMemberChatRoomChat(
      roomchatinfor
    );

    if (checkCreateNewMemberChatRoom) {
      this.createNewMemberChatRoomChat(roomchatinfor);
    }

    let roommemberchatindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberChatID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberID
        );
      }
    );

    if (roommemberchatindex >= 0) {
      let roommemberchatcontent = {
        MemberChattedID: roomchatinfor.MemberID,
        MemberChattedContent: roomchatinfor.MemberChatContent,
        MemberChattedDate: moment().format("HH:mm DD-MM-YYYY")
      };

      this.ZeamsRoomChatsContents[
        roommemberchatindex
      ].RoomMemberChatContent.push(roommemberchatcontent);
    }
    zeamsRoomChats.changeFirstPositionMemberChatMessage(roomchatinfor);
    zeamsRoomChats.unHiddenedMemberChatOfAllMemberChatRoomList(roomchatinfor);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewMessageToMemberAndMemberChat(roomchatinfor) {
    if (Object.keys(roomchatinfor.MemberChatContent).length !== 0) {
      this.addNewMessageToMemberRoomChat(roomchatinfor);
      this.addNewMessageToMemberChatRoomChat(roomchatinfor);
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  deleteAndNoRemoveMemberChatContentFromList(roomchatinfor) {
    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    this.ZeamsRoomChatsContents[roommemberindex].RoomMemberChatContent = [
      {
        MemberChattedContent: ""
      }
    ];

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  deleteAndRemoveMemberChatContentFromList(roomchatinfor) {
    zeamsRoomChats.removeMemberOfAllMemberChatRoomList(roomchatinfor);

    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    if (roommemberindex >= 0) {
      this.ZeamsRoomChatsContents.splice(roommemberindex, 1);
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  getRoomChatID(roomchatinfor) {
    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    return this.ZeamsRoomChatsContents[roommemberindex].RoomChatID;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getCurrentMemberRoomChatList(roomchatinfor) {
    let currentTeamMemberRoomChat = [];

    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    if (roommemberindex >= 0) {
      let currentIndexToRenderMemberChatContent = Number(
        roomchatinfor.CurrentIndexToRenderMemberChatContent
      );

      let numberMemberChatContent = Number(
        roomchatinfor.NumberMemberChatContent
      );

      let indexOfLastChat = this.ZeamsRoomChatsContents[roommemberindex]
        .RoomMemberChatContent.length;

      let indexOfFirstChat =
        indexOfLastChat -
        currentIndexToRenderMemberChatContent * numberMemberChatContent;

      if (indexOfFirstChat < 0) {
        indexOfFirstChat = 0;
      }

      currentTeamMemberRoomChat = this.ZeamsRoomChatsContents[
        roommemberindex
      ].RoomMemberChatContent.slice(indexOfFirstChat, indexOfLastChat);
    }

    return currentTeamMemberRoomChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkNextRenderMemberChatContent(roomchatinfor) {
    let checkNextRenderMemberChat = false;

    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return (
          roomchatitem.MemberID === roomchatinfor.MemberID &&
          roomchatitem.MemberChatID === roomchatinfor.MemberChatID
        );
      }
    );

    if (roommemberindex >= 0) {
      let currentIndexToRenderMemberChatContent = Number(
        roomchatinfor.CurrentIndexToRenderMemberChatContent
      );

      let numberMemberChatContent = Number(
        roomchatinfor.NumberMemberChatContent
      );

      let numberOfMemberChatContentList = this.ZeamsRoomChatsContents[
        roommemberindex
      ].RoomMemberChatContent.length;

      let indexOfLastChat =
        currentIndexToRenderMemberChatContent * numberMemberChatContent;

      if (indexOfLastChat < numberOfMemberChatContentList) {
        checkNextRenderMemberChat = true;
      } else {
        checkNextRenderMemberChat = false;
      }
    }

    return checkNextRenderMemberChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getLastMessageOfMemberChatOfRoomChat(roomchatinfor) {
    let roommemberindex = this.ZeamsRoomChatsContents.findIndex(
      roomchatitem => {
        return roomchatitem.RoomChatID === roomchatinfor.RoomChatID;
      }
    );

    let lastMessageOfMember = {
      MemberChattedContent: ""
    };

    if (roommemberindex >= 0) {
      let lastmessageindex =
        this.ZeamsRoomChatsContents[roommemberindex].RoomMemberChatContent
          .length - 1;
      lastMessageOfMember = this.ZeamsRoomChatsContents[roommemberindex]
        .RoomMemberChatContent[lastmessageindex];
    }

    return lastMessageOfMember;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseMemberChatContent(roomchatinfor) {
    let resmemberchatcontent;

    let currentTeamMemberRoomChat = this.getCurrentMemberRoomChatList(
      roomchatinfor
    );

    let checkNextRenderMemberChat = this.checkNextRenderMemberChatContent(
      roomchatinfor
    );

    resmemberchatcontent = {
      CurrentRoomChatContent: currentTeamMemberRoomChat,
      CheckNextRenderChatContent: checkNextRenderMemberChat,
      BannedOfMember: zeamsRoomChats.getBannedStatusOfRoomMember(roomchatinfor),
      BannedOfMemberChat: zeamsRoomChats.getBannedStatusOfRoomMemberChat(
        roomchatinfor
      ),
      MemberID: roomchatinfor.MemberID,
      MemberChatID: roomchatinfor.MemberChatID
    };

    return resmemberchatcontent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllMemberChatRoomList(roomchatinfor) {
    let allmemberroomlist = zeamsRoomChats.getAllMemberChatRoomList(
      roomchatinfor
    );
    let resAllMemberChat = {};
    let resAllMemberChatList = [];
    allmemberroomlist.forEach(memberroomitem => {
      let memberChatInfor = {
        LastMessageOfMember: this.getLastMessageOfMemberChatOfRoomChat(
          memberroomitem
        ),
        MemberChatInfor: memberroomitem
      };

      resAllMemberChatList.push(memberChatInfor);
    });

    resAllMemberChat = {
      RoomChatMemberList: resAllMemberChatList,
      FirstMemberChat: zeamsRoomChats.getFirstMemberChatOfRoomChat(
        roomchatinfor
      ),
      MemberID: roomchatinfor.MemberID
    };

    return resAllMemberChat;
  }

  //-----------------------------------------------------------------------------------------------------------------
}

let zeamsRoomChatsContents = new ZeamsRoomChatsContents();

module.exports = zeamsRoomChatsContents;
