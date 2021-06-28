import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class ZeamsMembers {
  constructor() {
    let members = fs.readFileSync(
      "../BACKEND/source/databases/zeamsMembers/zeamsMembers.json"
    );
    if (members.length > 0) {
      this.ZeamsMembers = JSON.parse(members);
    } else {
      this.ZeamsMembers = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsMembers/zeamsMembers.json",
      JSON.stringify(this.ZeamsMembers),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberRegister(member) {
    let newmember = {
      MemberID: uuidv4(),
      MemberLockAccount: "false",
      MemberInfor: []
    };
    let newmemberinfor = member;
    newmemberinfor.Birthday = moment(member.Birthday).format("DD-MM-YYYY");
    newmemberinfor.Avatar = "";
    newmember.MemberInfor.push(newmemberinfor);
    this.ZeamsMembers.push(newmember);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createAdminMember() {
    let adminMember = {
      MemberID: uuidv4(),
      MemberLockAccount: "false",
      MemberInfor: [
        {
          Username: "admin",
          PassWord: "admin",
          Fistname: "admin",
          Lastname: "admin",
          PhoneNumber: "0964980517",
          Birthday: "31-03-1999",
          Gender: "Nam",
          Avatar: ""
        }
      ]
    };
    let checkexistedadmin = false;
    this.ZeamsMembers.forEach(memberitem => {
      memberitem.MemberInfor.forEach(memberinforitem => {
        if (memberinforitem.Username === "admin") {
          checkexistedadmin = true;
        }
      });
    });
    if (!checkexistedadmin) {
      this.ZeamsMembers.push(adminMember);
    }
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkRegisterExistedUsernameAccount(member) {
    let checkExistedUsername = false;
    this.ZeamsMembers.forEach(memberitem => {
      memberitem.MemberInfor.forEach(memberinforitem => {
        if (member.Username === memberinforitem.Username) {
          checkExistedUsername = true;
        }
      });
    });
    return checkExistedUsername;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkRegisterExistedPhoneNumberAccount(member) {
    let checkExistedPhoneNumber = false;
    this.ZeamsMembers.forEach(memberitem => {
      memberitem.MemberInfor.forEach(memberinforitem => {
        if (member.PhoneNumber === memberinforitem.PhoneNumber) {
          checkExistedPhoneNumber = true;
        }
      });
    });
    return checkExistedPhoneNumber;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkRegisterAdminAccount(member) {
    if (member.Username === "admin" && member.PassWord === "admin") {
      return false;
    } else {
      return true;
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkLoginMemberAccount(member) {
    let checkUsernameLoginMember = false;
    let checkPassWordLoginMember = false;
    let checkLoginMember = "";

    this.ZeamsMembers.forEach(memberitem => {
      memberitem.MemberInfor.forEach(memberinforitem => {
        if (member.Username === memberinforitem.Username) {
          checkUsernameLoginMember = true;
          if (member.PassWord === memberinforitem.PassWord) {
            checkPassWordLoginMember = true;
          }
        }
      });
    });

    if (
      checkUsernameLoginMember === true &&
      checkPassWordLoginMember === true
    ) {
      checkLoginMember = "success-login";
    } else if (
      checkUsernameLoginMember === true &&
      checkPassWordLoginMember === false
    ) {
      checkLoginMember = "incorrect-password";
    } else {
      checkLoginMember = "non-existed-username";
    }
    return checkLoginMember;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkValidateMemberLogin(member) {
    if (Object.keys(member.Username).length === 0) {
      return "username";
    } else if (Object.keys(member.PassWord).length === 0) {
      return "password";
    } else {
      let checkCorrectAccount = this.checkLoginMemberAccount(member);

      return checkCorrectAccount;
    }
  }
  //-----------------------------------------------------------------------------------------------------------------

  checkValidateNewMemberRegister(member) {
    if (Object.keys(member.Username).length === 0) {
      return "username";
    } else if (Object.keys(member.PassWord).length === 0) {
      return "password";
    } else if (Object.keys(member.PhoneNumber).length === 0) {
      return "phonenumber";
    } else if (Object.keys(member.Firstname).length === 0) {
      return "firstname";
    } else if (Object.keys(member.Lastname).length === 0) {
      return "lastname";
    } else if (Object.keys(member.Birthday).length === 0) {
      return "birthday";
    } else if (Object.keys(member.Gender).length === 0) {
      return "gender";
    } else {
      let checkExistedUsername = this.checkRegisterExistedUsernameAccount(
        member
      );
      if (checkExistedUsername) {
        return "existed-username";
      } else {
        let checkExistedPhoneNumber = this.checkRegisterExistedPhoneNumberAccount(
          member
        );
        if (checkExistedPhoneNumber) {
          return "existed-phonenumber";
        } else {
          return "non-existed";
        }
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  resNewMemberRegister(member) {
    let checkNewMemberRegister = zeamsMembers.checkValidateNewMemberRegister(
      member
    );
    let resNewMemberRegister;

    if (checkNewMemberRegister === "non-existed") {
      if (this.ZeamsMembers.length === 0) {
        this.createAdminMember();
      }
      this.createNewMemberRegister(member);
      resNewMemberRegister = { checkValidate: "success-register" };
    } else {
      resNewMemberRegister = {
        checkValidate: checkNewMemberRegister
      };
    }
    return resNewMemberRegister;
  }

  //-----------------------------------------------------------------------------------------------------------------

  resMemberLogin(member) {
    let checkMemberLogin = zeamsMembers.checkValidateMemberLogin(member);
    let resMemberLogin;

    if (checkMemberLogin === "success-login") {
      let MemberLoginID = this.getLoginMemberID(member);
      resMemberLogin = {
        checkValidate: "success-login",
        MemberID: MemberLoginID
      };
    } else {
      resMemberLogin = {
        checkValidate: checkMemberLogin
      };
    }
    return resMemberLogin;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getLoginMemberID(member) {
    let indexmemberlogin = "";
    this.ZeamsMembers.forEach((memberitem, memberIndex) => {
      memberitem.MemberInfor.forEach(memberinforitem => {
        if (
          member.Username === memberinforitem.Username &&
          member.PassWord === memberinforitem.PassWord
        ) {
          indexmemberlogin = memberIndex;
        }
      });
    });

    return this.ZeamsMembers[indexmemberlogin].MemberID;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getLoginMemberFullname(member) {
    let memberindex = this.ZeamsMembers.findIndex(item => {
      return item.MemberID === member.MemberID;
    });
    let resMemberFullname = {};

    if (memberindex >= 0) {
      let FirstnameMember = this.ZeamsMembers[memberindex].MemberInfor[0]
        .Firstname;
      let LastnameMember = this.ZeamsMembers[memberindex].MemberInfor[0]
        .Lastname;
      resMemberFullname = {
        Firstname: FirstnameMember,
        Lastname: LastnameMember
      };
    }

    return resMemberFullname;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getMemberFullName(member) {
    let memberindex = this.ZeamsMembers.findIndex(item => {
      return item.MemberID === member.MemberID;
    });

    let MemberFullName = "";

    if (memberindex >= 0) {
      let FirstnameMember = this.ZeamsMembers[memberindex].MemberInfor[0]
        .Firstname;
      let LastnameMember = this.ZeamsMembers[memberindex].MemberInfor[0]
        .Lastname;

      MemberFullName = LastnameMember + " " + FirstnameMember;
    }

    return MemberFullName;
  }
}

let zeamsMembers = new ZeamsMembers();

module.exports = zeamsMembers;
