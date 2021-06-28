import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import zeamsMembers from "../zeamsMembers/zeamsMembers";

class ZeamsRoomChats {
  constructor() {
    let roomchats = fs.readFileSync(
      "../BACKEND/source/databases/zeamsRoomChats/zeamsRoomChats.json"
    );
    if (roomchats.length > 0) {
      this.ZeamsRoomChats = JSON.parse(roomchats);
    } else {
      this.ZeamsRoomChats = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsRoomChats/zeamsRoomChats.json",
      JSON.stringify(this.ZeamsRoomChats),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberRoomChat(roomchatinfor) {
    let roomChatID = uuidv4();

    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex < 0) {
      let memberchat = {
        MemberID: roomchatinfor.MemberChatID
      };

      let newmemberroomchat = {
        MemberID: roomchatinfor.MemberID,
        RoomChatMemberList: [
          {
            MemberID: roomchatinfor.MemberChatID,
            MemberFullName: zeamsMembers.getMemberFullName(memberchat),
            RoomChatID: roomChatID,
            HiddenMemberChat: false,
            BannedMemberChat: false,
            SeenMemberChat: true
          }
        ]
      };

      this.ZeamsRoomChats.push(newmemberroomchat);
    } else {
      let memberofroomchatindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(memberofroomchatitem => {
        return memberofroomchatitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofroomchatindex < 0) {
        let memberchat = {
          MemberID: roomchatinfor.MemberChatID
        };

        let newmemberofroomchat = {
          MemberID: roomchatinfor.MemberChatID,
          MemberFullName: zeamsMembers.getMemberFullName(memberchat),
          RoomChatID: roomChatID,
          HiddenMemberChat: false,
          BannedMemberChat: false,
          SeenMemberChat: true
        };

        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.push(
          newmemberofroomchat
        );
      }
    }

    this.saveDataJSON();

    return roomChatID;
  }
  //================================================================================================================

  createNewMemberChatRoomChat(roomchatinfor) {
    let roomChatID = uuidv4();

    let memberchatroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberChatID;
      }
    );

    if (memberchatroomchatindex < 0) {
      let memberchat = {
        MemberID: roomchatinfor.MemberID
      };

      let newmemberchatroomchat = {
        MemberID: roomchatinfor.MemberChatID,
        RoomChatMemberList: [
          {
            MemberID: roomchatinfor.MemberID,
            MemberFullName: zeamsMembers.getMemberFullName(memberchat),
            RoomChatID: roomChatID,
            HiddenMemberChat: false,
            BannedMemberChat: false,
            SeenMemberChat: false
          }
        ]
      };

      this.ZeamsRoomChats.push(newmemberchatroomchat);
    } else {
      let memberchatofroomchatindex = this.ZeamsRoomChats[
        memberchatroomchatindex
      ].RoomChatMemberList.findIndex(memberofroomchatitem => {
        return memberofroomchatitem.MemberID === roomchatinfor.MemberID;
      });

      if (memberchatofroomchatindex < 0) {
        let memberchat = {
          MemberID: roomchatinfor.MemberID
        };

        let newmemberchatofroomchat = {
          MemberID: roomchatinfor.MemberID,
          MemberFullName: zeamsMembers.getMemberFullName(memberchat),
          RoomChatID: roomChatID,
          HiddenMemberChat: false,
          BannedMemberChat: false,
          SeenMemberChat: false
        };

        this.ZeamsRoomChats[memberchatroomchatindex].RoomChatMemberList.push(
          newmemberchatofroomchat
        );
      }
    }

    this.saveDataJSON();

    return roomChatID;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );
    let allUnhiddenedMemberChat = [];
    if (memberroomchatindex >= 0) {
      this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.forEach(
        memberroomitem => {
          if (memberroomitem.HiddenMemberChat === false) {
            allUnhiddenedMemberChat.push(memberroomitem);
          }
        }
      );
    }

    return allUnhiddenedMemberChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getFirstMemberChatOfRoomChat(roomchatinfor) {
    let getAllMemberChat = this.getAllMemberChatRoomList(roomchatinfor);
    let firstSeenMemberChat = {};
    let checkalreadylookfor = false;

    if (getAllMemberChat.length !== 0) {
      getAllMemberChat.forEach(memberchatitem => {
        if (checkalreadylookfor === false) {
          if (memberchatitem.SeenMemberChat === true) {
            firstSeenMemberChat = memberchatitem;
            checkalreadylookfor = true;
          }
        }
      });

      if (checkalreadylookfor === false) {
        firstSeenMemberChat = getAllMemberChat[0];
      }
    }

    return firstSeenMemberChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeFirstPositionMemberMessage(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );
    if (memberroomchatindex >= 0) {
      let positionmemberchatindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(memberchatitem => {
        return memberchatitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (positionmemberchatindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          positionmemberchatindex
        ].SeenMemberChat = true;

        let getMemberChat = this.ZeamsRoomChats[memberroomchatindex]
          .RoomChatMemberList[positionmemberchatindex];

        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.splice(
          positionmemberchatindex,
          1
        );

        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.unshift(
          getMemberChat
        );
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeFirstPositionMemberChatMessage(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberChatID;
      }
    );
    if (memberroomchatindex >= 0) {
      let positionmemberchatindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(memberchatitem => {
        return memberchatitem.MemberID === roomchatinfor.MemberID;
      });

      if (positionmemberchatindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          positionmemberchatindex
        ].SeenMemberChat = false;

        let getMemberChat = this.ZeamsRoomChats[memberroomchatindex]
          .RoomChatMemberList[positionmemberchatindex];

        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.splice(
          positionmemberchatindex,
          1
        );

        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.unshift(
          getMemberChat
        );
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeMemberOfAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList.splice(
          memberofchatlistindex,
          1
        );
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  hiddenedMemberOfAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].HiddenMemberChat = true;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  unHiddenedMemberOfAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].HiddenMemberChat = false;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  unHiddenedMemberChatOfAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberChatID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].HiddenMemberChat = false;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  setSeenMemberOfAllMemberChatRoomList(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].SeenMemberChat = true;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getBannedStatusOfRoomMember(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    let bannedStatusOfRoomChat = false;

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(memberofchatlistitem => {
        return memberofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        bannedStatusOfRoomChat = this.ZeamsRoomChats[memberroomchatindex]
          .RoomChatMemberList[memberofchatlistindex].BannedMemberChat;
      }
    }

    return bannedStatusOfRoomChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getBannedStatusOfRoomMemberChat(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberChatID;
      }
    );

    let bannedStatusOfRoomChat = false;

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberID;
      });

      if (memberofchatlistindex >= 0) {
        bannedStatusOfRoomChat = this.ZeamsRoomChats[memberroomchatindex]
          .RoomChatMemberList[memberofchatlistindex].BannedMemberChat;
      }
    }

    return bannedStatusOfRoomChat;
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeBannedOfRoomChatMember(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].BannedMemberChat = true;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeUnbannedOfRoomChatMember(roomchatinfor) {
    let memberroomchatindex = this.ZeamsRoomChats.findIndex(
      memberroomchatitem => {
        return memberroomchatitem.MemberID === roomchatinfor.MemberID;
      }
    );

    if (memberroomchatindex >= 0) {
      let memberofchatlistindex = this.ZeamsRoomChats[
        memberroomchatindex
      ].RoomChatMemberList.findIndex(membetofchatlistitem => {
        return membetofchatlistitem.MemberID === roomchatinfor.MemberChatID;
      });

      if (memberofchatlistindex >= 0) {
        this.ZeamsRoomChats[memberroomchatindex].RoomChatMemberList[
          memberofchatlistindex
        ].BannedMemberChat = false;
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------
}

let zeamsRoomChats = new ZeamsRoomChats();

module.exports = zeamsRoomChats;
