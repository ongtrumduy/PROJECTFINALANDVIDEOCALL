import fs from "fs";

class ZeamsExcercisesLists {
  constructor() {
    let excerciselists = fs.readFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercisesLists.json"
    );
    // console.log("Ra cái excerciselists", excerciselists.length);
    if (excerciselists.length > 0) {
      this.ZeamsExcercisesLists = JSON.parse(excerciselists);
    } else {
      this.ZeamsExcercisesLists = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercisesLists.json",
      JSON.stringify(this.ZeamsExcercisesLists),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewExcerciseListContent() {
    let excerciselistcontent = {
      ExcercisePublicList: [],
      ExcercisePrivateList: [],
      ExcerciseOwnedList: []
    };

    this.ZeamsExcercisesLists.push(excerciselistcontent);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewExcerciseListContent() {
    let getlength = this.ZeamsExcercisesLists.length;
    if (getlength <= 0) {
      return false;
    } else {
      return true;
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewExcercisesListItemContent(excerciseinfor) {
    let checkcreatenew = this.checkCreateNewExcerciseListContent();
    if (checkcreatenew) {
      if (excerciseinfor.ExcerciseType === "public") {
        this.ZeamsExcercisesLists[0].ExcercisePublicList.push(excerciseinfor);
      } else if (excerciseinfor.ExcerciseType === "private") {
        this.ZeamsExcercisesLists[0].ExcercisePrivateList.push(excerciseinfor);
      }
    } else {
      this.createNewExcerciseListContent();
      if (excerciseinfor.ExcerciseType === "public") {
        this.ZeamsExcercisesLists[0].ExcercisePublicList.push(excerciseinfor);
      } else if (excerciseinfor.ExcerciseType === "private") {
        this.ZeamsExcercisesLists[0].ExcercisePrivateList.push(excerciseinfor);
      }
    }
    this.addNewExcerciseOwnedItemContent(excerciseinfor);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewExcerciseOwnedItemContent(excerciseinfor) {
    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    let excerciseinforcontent = {
      ExcerciseID: excerciseinfor.ExcerciseID,
      ExcerciseName: excerciseinfor.ExcerciseName,
      ExcerciseType: excerciseinfor.ExcerciseType,
      ExcerciseDescription: excerciseinfor.ExcerciseDescription,
      ExcerciseLogo: excerciseinfor.ExcerciseLogo,
      ExcerciseNumberQuestion: excerciseinfor.ExcerciseNumberQuestion
    };

    if (memberExcerciseIndex < 0) {
      let memberexcerciseinfor = {
        MemberID: excerciseinfor.MemberID,
        ExcerciseMemberAllOwnedList: []
      };
      memberexcerciseinfor.ExcerciseMemberAllOwnedList.push(
        excerciseinforcontent
      );

      this.ZeamsExcercisesLists[0].ExcerciseOwnedList.push(
        memberexcerciseinfor
      );
    } else {
      this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
        memberExcerciseIndex
      ].ExcerciseMemberAllOwnedList.push(excerciseinforcontent);
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeCreateExcerciseFromList(excerciseinfor) {
    if (excerciseinfor.ExcerciseType === "public") {
      let excerciseidindex = this.ZeamsExcercisesLists[0].ExcercisePublicList.findIndex(
        excerciseitem => {
          return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
        }
      );
      this.ZeamsExcercisesLists[0].ExcercisePublicList.splice(
        excerciseidindex,
        1
      );
    } else if (excerciseinfor.ExcerciseType === "private") {
      let excerciseidindex = this.ZeamsExcercisesLists[0].ExcercisePrivateList.findIndex(
        excerciseitem => {
          return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
        }
      );
      this.ZeamsExcercisesLists[0].ExcercisePublicList.splice(
        excerciseidindex,
        1
      );
    }
    this.removeExcerciseOwnedItemContent(excerciseinfor);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeExcerciseOwnedItemContent(excerciseinfor) {
    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );
    let memberExcerciseItemIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
      memberExcerciseIndex
    ].ExcerciseMemberAllOwnedList.findIndex(memberexcerciseitem => {
      return memberexcerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
      memberExcerciseIndex
    ].ExcerciseMemberAllOwnedList.splice(memberExcerciseItemIndex, 1);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  getCurrentExcerciseChoicePublicPageOnList(excerciseinfor) {
    let currentIndexExcercisePage = Number(
      excerciseinfor.CurrentIndexExcercisePage
    );
    let numberExcerciseOnPage = Number(excerciseinfor.NumberExcerciseOnPage);

    let indexOfLastExcercise =
      currentIndexExcercisePage * numberExcerciseOnPage;

    let indexOfFirstExcercise = indexOfLastExcercise - numberExcerciseOnPage;

    let currentChoiceIndexExcerciseList = [];

    currentChoiceIndexExcerciseList = this.ZeamsExcercisesLists[0].ExcercisePublicList.slice(
      indexOfFirstExcercise,
      indexOfLastExcercise
    );

    return currentChoiceIndexExcerciseList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getCurrentExcerciseChoiceOwnedPageOnList(excerciseinfor) {
    let currentIndexExcercisePage = Number(
      excerciseinfor.CurrentIndexExcercisePage
    );
    let numberExcerciseOnPage = Number(excerciseinfor.NumberExcerciseOnPage);

    let indexOfLastExcercise =
      currentIndexExcercisePage * numberExcerciseOnPage;

    let indexOfFirstExcercise = indexOfLastExcercise - numberExcerciseOnPage;

    let currentChoiceIndexExcerciseList = [];

    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    currentChoiceIndexExcerciseList = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
      memberExcerciseIndex
    ].ExcerciseMemberAllOwnedList.slice(
      indexOfFirstExcercise,
      indexOfLastExcercise
    );

    return currentChoiceIndexExcerciseList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseMemberChoiceIndexExcercisePublicListContent(excerciseinfor) {
    let resMemberChoiceExcercise = {};

    resMemberChoiceExcercise = {
      AllNumberExcercise: this.ZeamsExcercisesLists[0].ExcercisePublicList
        .length,
      CurrentExcerciseChoicePublicList: this.getCurrentExcerciseChoicePublicPageOnList(
        excerciseinfor
      ),
      MemberID: excerciseinfor.MemberID
    };

    return resMemberChoiceExcercise;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseMemberChoiceIndexExcerciseOwnedListContent(excerciseinfor) {
    let checkcreatenew = this.checkCreateNewExcerciseListContent();
    let resMemberChoiceExcercise = {};

    if (!checkcreatenew) {
      this.createNewExcerciseListContent();
    }

    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    if (memberExcerciseIndex >= 0) {
      resMemberChoiceExcercise = {
        AllNumberExcercise: this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
          memberExcerciseIndex
        ].ExcerciseMemberAllOwnedList.length,
        CurrentExcerciseChoiceOwnedList: this.getCurrentExcerciseChoiceOwnedPageOnList(
          excerciseinfor
        ),
        MemberID: excerciseinfor.MemberID
      };
    } else {
      resMemberChoiceExcercise = {
        AllNumberExcercise: 0,
        CurrentExcerciseChoiceOwnedList: [],
        MemberID: excerciseinfor.MemberID
      };
    }

    return resMemberChoiceExcercise;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getMemberChoiceExcerciseOWnedItemContent(excerciseinfor) {
    let getMemberChoiceExcercise = {};
    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    if (memberExcerciseIndex >= 0) {
      let excercisechoiceindex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
        memberExcerciseIndex
      ].ExcerciseMemberAllOwnedList.findIndex(excerciseitem => {
        return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
      });

      getMemberChoiceExcercise = this.ZeamsExcercisesLists[0]
        .ExcerciseOwnedList[memberExcerciseIndex].ExcerciseMemberAllOwnedList[
        excercisechoiceindex
      ];
    }

    return getMemberChoiceExcercise;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseMemberChoiceExcerciseOwnedItemContent(excerciseinfor) {
    let resMemberChoiceExcerciseItem = {};

    resMemberChoiceExcerciseItem = {
      ExcerciseInfor: this.getMemberChoiceExcerciseOWnedItemContent(
        excerciseinfor
      ),
      CheckExcerciseItemInOwned: this.checkMemberChoiceExcerciseItemInOwnedMemberList(
        excerciseinfor
      )
    };

    return resMemberChoiceExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkMemberChoiceExcerciseItemInOwnedMemberList(excerciseinfor) {
    let checkMemberChoiceExcerciseItem = false;

    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    if (memberExcerciseIndex >= 0) {
      let excercisechoiceindex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
        memberExcerciseIndex
      ].ExcerciseMemberAllOwnedList.findIndex(excerciseitem => {
        return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
      });

      if (excercisechoiceindex >= 0) {
        checkMemberChoiceExcerciseItem = true;
      }
    }

    return checkMemberChoiceExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewExcerciseItemToMemberOwnedList(excerciseinfor) {
    // console.log("dữ liệu đổ vào đây đi tao xem nào ", excerciseinfor);
    let checkMemberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    if (checkMemberExcerciseIndex < 0) {
      let memberexcerciseinfor = {
        MemberID: excerciseinfor.MemberID,
        ExcerciseMemberAllOwnedList: []
      };

      this.ZeamsExcercisesLists[0].ExcerciseOwnedList.push(
        memberexcerciseinfor
      );
    }

    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    let checkmemberexcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
      memberExcerciseIndex
    ].ExcerciseMemberAllOwnedList.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    if (checkmemberexcerciseIndex < 0) {
      if (excerciseinfor.ExcerciseType === "public") {
        let excerciseidindex = this.ZeamsExcercisesLists[0].ExcercisePublicList.findIndex(
          excerciseitem => {
            return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
          }
        );

        let excerciseiteminfor = this.ZeamsExcercisesLists[0]
          .ExcercisePublicList[excerciseidindex];

        let excerciseaddinfor = {
          ExcerciseID: excerciseiteminfor.ExcerciseID,
          ExcerciseName: excerciseiteminfor.ExcerciseName,
          ExcerciseType: excerciseiteminfor.ExcerciseType,
          ExcerciseDescription: excerciseiteminfor.ExcerciseDescription,
          ExcerciseLogo: excerciseiteminfor.ExcerciseLogo,
          ExcerciseNumberQuestion: excerciseiteminfor.ExcerciseNumberQuestion
        };

        this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
          memberExcerciseIndex
        ].ExcerciseMemberAllOwnedList.push(excerciseaddinfor);
      } else if (excerciseinfor.ExcerciseType === "private") {
        let excerciseidindex = this.ZeamsExcercisesLists[0].ExcercisePrivateList.findIndex(
          excerciseitem => {
            return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
          }
        );

        let excerciseiteminfor = this.ZeamsExcercisesLists[0]
          .ExcercisePrivateList[excerciseidindex];

        let excerciseaddinfor = {
          ExcerciseID: excerciseiteminfor.ExcerciseID,
          ExcerciseName: excerciseiteminfor.ExcerciseName,
          ExcerciseType: excerciseiteminfor.ExcerciseType,
          ExcerciseDescription: excerciseiteminfor.ExcerciseDescription,
          ExcerciseLogo: excerciseiteminfor.ExcerciseLogo,
          ExcerciseNumberQuestion: excerciseiteminfor.ExcerciseNumberQuestion
        };

        this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
          memberExcerciseIndex
        ].ExcerciseMemberAllOwnedList.push(excerciseaddinfor);
      }
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeNewExcerciseItemToMemberOwnedList(excerciseinfor) {
    let memberExcerciseIndex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList.findIndex(
      memberexcerciseitem => {
        return memberexcerciseitem.MemberID === excerciseinfor.MemberID;
      }
    );

    let excerciseidindex = this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
      memberExcerciseIndex
    ].ExcerciseMemberAllOwnedList.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    if (excerciseidindex >= 0) {
      this.ZeamsExcercisesLists[0].ExcerciseOwnedList[
        memberExcerciseIndex
      ].ExcerciseMemberAllOwnedList.splice(excerciseidindex, 1);
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAddNewExcerciseItemToMemberOwnedList(excerciseinfor) {
    this.addNewExcerciseItemToMemberOwnedList(excerciseinfor);

    let resAddNewExcerciseItem = {
      checkValidate: "add-success"
    };

    return resAddNewExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseRemoveNewExcerciseItemToMemberOwnedList(excerciseinfor) {
    this.removeNewExcerciseItemToMemberOwnedList(excerciseinfor);

    let resRemoveNewExcerciseItem = {
      checkValidate: "remove-success"
    };

    return resRemoveNewExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getMemberChoiceExcercisePublicItemContent(excerciseinfor) {
    let getMemberChoiceExcerciseItem = {};

    let excercisechoiceindex = this.ZeamsExcercisesLists[0].ExcercisePublicList.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
      }
    );

    if (excercisechoiceindex >= 0) {
      getMemberChoiceExcerciseItem = this.ZeamsExcercisesLists[0]
        .ExcercisePublicList[excercisechoiceindex];
    }

    return getMemberChoiceExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseMemberChoiceExcercisePublicItemContent(excerciseinfor) {
    let resMemberChoiceExcerciseItem = {};

    resMemberChoiceExcerciseItem = {
      ExcerciseInfor: this.getMemberChoiceExcercisePublicItemContent(
        excerciseinfor
      ),
      CheckExcerciseItemInOwned: this.checkMemberChoiceExcerciseItemInOwnedMemberList(
        excerciseinfor
      )
    };

    return resMemberChoiceExcerciseItem;
  }

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}

let zeamsExcercisesLists = new ZeamsExcercisesLists();

module.exports = zeamsExcercisesLists;
