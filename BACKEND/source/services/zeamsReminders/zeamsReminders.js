import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class ZeamsReminders {
  constructor() {
    let reminders = fs.readFileSync(
      "../BACKEND/source/databases/zeamsReminders/zeamsReminders.json"
    );
    if (reminders.length > 0) {
      this.ZeamsReminders = JSON.parse(reminders);
    } else {
      this.ZeamsReminders = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsReminders/zeamsReminders.json",
      JSON.stringify(this.ZeamsReminders),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewReminderList(reminderinfor) {
    let newreminderlist = {
      MemberID: reminderinfor.MemberID,
      MemberReminderUnfinishedList: [],
      MemberReminderFinishedList: []
    };

    this.ZeamsReminders.push(newreminderlist);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewReminder(reminderinfor) {
    let reminderindex = this.ZeamsReminders.findIndex(reminderitem => {
      return reminderitem.MemberID === reminderinfor.MemberID;
    });

    let newreminder = {
      ReminderID: uuidv4(),
      ReminderType: "unfinished",
      ReminderName: reminderinfor.ReminderName,
      ReminderDescription: reminderinfor.ReminderDescription,
      ReminderWarning: reminderinfor.ReminderWarning,
      ReminderCreateDate: moment().format("HH:mm DD-MM-YYYY"),
      ReminderEndDate: moment(reminderinfor.ReminderEndDate).format(
        "DD-MM-YYYY"
      ),
      ReminderRemoveDate: moment(reminderinfor.ReminderEndDate)
        .add(15, "days")
        .format("DD-MM-YYYY")
    };

    this.ZeamsReminders[reminderindex].MemberReminderUnfinishedList.unshift(
      newreminder
    );
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateEndDate(reminderinfor) {
    let checkEndDate = false;
    if (
      moment(reminderinfor.ReminderEndDate, "YYYY/MM/DD").year() >
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      checkEndDate = true;
    } else if (
      moment(reminderinfor.ReminderEndDate, "YYYY/MM/DD").year() ===
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      if (
        moment(reminderinfor.ReminderEndDate, "YYYY/MM/DD").month() >
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        checkEndDate = true;
      } else if (
        moment(reminderinfor.ReminderEndDate, "YYYY/MM/DD").month() ===
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        if (
          moment(reminderinfor.ReminderEndDate, "YYYY/MM/DD").date() >
          moment(moment(), "DD/MM/YYYY").date()
        ) {
          checkEndDate = true;
        }
      }
    }
    return checkEndDate;
  }

  //-----------------------------------------------------------------------------------------------------------------
  responseMemberReminderList(reminderinfor) {
    let resmemberreminderlist;
    let reminderindex = this.ZeamsReminders.findIndex(reminderitem => {
      return reminderitem.MemberID === reminderinfor.MemberID;
    });
    if (reminderindex < 0) {
      this.createNewReminderList(reminderinfor);
      resmemberreminderlist = {
        MemberID: reminderinfor.MemberID,
        MemberReminderUnfinishedList: [],
        MemberReminderFinishedList: []
      };
    } else {
      resmemberreminderlist = this.ZeamsReminders[reminderindex];
    }

    return resmemberreminderlist;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCreateNewReminder(reminderinfor) {
    let resCreateNewReminder;
    if (Object.keys(reminderinfor.ReminderName).length === 0) {
      resCreateNewReminder = {
        checkValidate: "remindername"
      };
    } else if (Object.keys(reminderinfor.ReminderEndDate).length === 0) {
      resCreateNewReminder = {
        checkValidate: "reminderenddate"
      };
    } else if (!this.checkCreateEndDate(reminderinfor)) {
      resCreateNewReminder = {
        checkValidate: "non-pass-end-date"
      };
    } else {
      this.createNewReminder(reminderinfor);
      resCreateNewReminder = {
        checkValidate: "success-create-reminder"
      };
    }
    return resCreateNewReminder;
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeReminderToFinished(reminderinfor) {
    let reminderindex = this.ZeamsReminders.findIndex(reminderitem => {
      return reminderitem.MemberID === reminderinfor.MemberID;
    });
    let reminderunfinishedindex = this.ZeamsReminders[
      reminderindex
    ].MemberReminderUnfinishedList.findIndex(reminderunfinisheditem => {
      return reminderunfinisheditem.ReminderID === reminderinfor.ReminderID;
    });

    this.ZeamsReminders[reminderindex].MemberReminderUnfinishedList[
      reminderunfinishedindex
    ].ReminderType = "finished";

    this.ZeamsReminders[reminderindex].MemberReminderFinishedList.unshift(
      this.ZeamsReminders[reminderindex].MemberReminderUnfinishedList[
        reminderunfinishedindex
      ]
    );

    this.ZeamsReminders[reminderindex].MemberReminderUnfinishedList.splice(
      reminderunfinishedindex,
      1
    );

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  changeReminderToUnfinished(reminderinfor) {
    let reminderindex = this.ZeamsReminders.findIndex(reminderitem => {
      return reminderitem.MemberID === reminderinfor.MemberID;
    });
    let reminderfinishedindex = this.ZeamsReminders[
      reminderindex
    ].MemberReminderFinishedList.findIndex(reminderunfinisheditem => {
      return reminderunfinisheditem.ReminderID === reminderinfor.ReminderID;
    });

    this.ZeamsReminders[reminderindex].MemberReminderFinishedList[
      reminderfinishedindex
    ].ReminderType = "unfinished";

    this.ZeamsReminders[reminderindex].MemberReminderUnfinishedList.unshift(
      this.ZeamsReminders[reminderindex].MemberReminderFinishedList[
        reminderfinishedindex
      ]
    );

    this.ZeamsReminders[reminderindex].MemberReminderFinishedList.splice(
      reminderfinishedindex,
      1
    );

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}
let zeamsReminders = new ZeamsReminders();

module.exports = zeamsReminders;
