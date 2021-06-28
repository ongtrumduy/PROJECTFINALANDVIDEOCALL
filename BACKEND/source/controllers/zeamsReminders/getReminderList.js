import zeamsReminders from "../../services/zeamsReminders/zeamsReminders";

let GetReminderList = async (req, res) => {
  //   console.log("VÀo đây trước", req.body);
  let getReminderList = await zeamsReminders.responseMemberReminderList(
    req.body
  );
  // console.log("VÀo đây ngay", getReminderList);
  res.send(getReminderList);
};

module.exports = GetReminderList;
