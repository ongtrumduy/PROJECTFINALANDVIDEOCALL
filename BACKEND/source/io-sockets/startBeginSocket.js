import zeamsTeams from "../services/zeamsTeams/zeamsTeams";

class BeginSocket {
  getAllSocketOfMember(membersocket, memberID, socketID) {
    // console.log("Vào socketID " + socketID);
    if (membersocket[memberID]) {
      membersocket[memberID].push(socketID);
    } else {
      membersocket[memberID] = [socketID];
    }
    // console.log("Sao lại méo được " + membersocket);
    return membersocket;
  }

  emitAllSocketsOfMember(membersocket, memberID, io, eventEmit, data) {
    if (membersocket[memberID]) {
      membersocket[memberID].forEach(socketid => {
        console.log("Bắn ra socketid " + socketid);
        return io.sockets.in(socketid).emit(eventEmit, data);
      });
    }
  }

  emitAllSocketsOfMemberTeam(membersocket, teamID, io, eventEmit, data) {
    let teamMemberList = zeamsTeams.getAllMemberIDsOfTeam(teamID);
    console.log("RA cái teamMemberList xem sao ", teamMemberList);
    teamMemberList.forEach(memberitem => {
      this.emitAllSocketsOfMember(
        membersocket,
        memberitem.MemberID,
        io,
        eventEmit,
        data
      );
    });
  }

  setRemoveSocket(membersocket, memberID, socketID) {
    if (membersocket[memberID]) {
      membersocket[memberID] = membersocket[memberID].filter(socketid => {
        return socketid !== socketID;
      });
      if (!membersocket[memberID].length) {
        delete membersocket[memberID];
      }
    }
    return membersocket;
  }

  setRemoveDisconnectSocket(membersocket, data, socketID) {
    let memberIDOnlineList = [];

    if (data === "transport close") {
      memberIDOnlineList = Object.keys(membersocket);
      memberIDOnlineList.forEach(memberid => {
        if (membersocket[memberid]) {
          membersocket[memberid] = membersocket[memberid].filter(sockerid => {
            return sockerid !== socketID;
          });
          if (!membersocket[memberid].length) {
            delete membersocket[memberid];
          }
        }
      });
    }
    return membersocket;
  }

  setStartBeginSocket(socket, membersocket) {
    // let memberSocketOnlineList = [];

    socket.on("sent-online-memberID", data => {
      // console.log("Nhận được MemberID " + data.MemberID);
      // console.log("Nhận được socketID " + socket.id);

      membersocket = this.getAllSocketOfMember(
        membersocket,
        data.MemberID,
        socket.id
      );
      // memberIDOnlineList = Object.keys(membersocket);
      // memberSocketOnlineList = Object.values(membersocket);
      // console.log("Bắt được rồi ");
      // console.log(memberIDOnlineList);
    });

    socket.on("disconnect-logout", data => {
      membersocket = this.setRemoveSocket(
        membersocket,
        data.MemberID,
        socket.id
      );
      // memberIDOnlineList = Object.keys(membersocket);
      // memberSocketOnlineList = Object.values(membersocket);
      // console.log("Đăng xuất rồi ");
      // console.log(memberIDOnlineList);
    });

    socket.on("disconnect", data => {
      membersocket = this.setRemoveDisconnectSocket(
        membersocket,
        data,
        // memberIDOnlineList,
        socket.id
      );
      // memberIDOnlineList = Object.keys(membersocket);
      // memberSocketOnlineList = Object.values(membersocket);
      // console.log("Mất kết nối rồi ");
      // console.log(memberIDOnlineList);
    });

    return membersocket;
  }

  getAllMemberStartCall(membercallsocket, memberID, socketID) {
    if (membercallsocket[memberID]) {
      return membercallsocket;
    } else {
      membercallsocket[memberID] = [socketID];
    }
    return membercallsocket;
  }

  checkJoinedMemberCall(membercallsocket, memberID) {
    if (membercallsocket[memberID]) {
      return true;
    } else {
      return false;
    }
  }

  getAllTeamStartCall(allteamcall, membercallsocket, teamID, memberID) {
    let checkjoinedcall = this.checkJoinedMemberCall(
      membercallsocket,
      memberID
    );
    if (!checkjoinedcall) {
      if (allteamcall[teamID]) {
        allteamcall[teamID].push(memberID);
      } else {
        allteamcall[teamID] = [memberID];
      }
    }

    return allteamcall;
  }

  checkJoinedTeamCall(allteamcall, memberID) {
    if (allteamcall[memberID]) {
      return true;
    } else {
      return false;
    }
  }

  emitAllOtherMemberJoinedCallOfTeam(
    allteamcall,
    membercallsocket,
    teamID,
    memberID,
    io,
    eventEmit,
    data
  ) {
    if (allteamcall[teamID]) {
      allteamcall[teamID].forEach(memberid => {
        if (memberid !== memberID) {
          membercallsocket[memberid].forEach(socketid => {
            return io.sockets.in(socketid).emit(eventEmit, data);
          });
        }
      });
    }
  }

  // check nếu 1 thằng mới tham gia vào cuộc goi team có sẵn mà chưa tham gia gọi phải gửi thông báo

  // check nếu 1 team mới có cuộc gọi check gửi tin nhắn cho các thành viên
}

let beginSocket = new BeginSocket();

module.exports = beginSocket;
