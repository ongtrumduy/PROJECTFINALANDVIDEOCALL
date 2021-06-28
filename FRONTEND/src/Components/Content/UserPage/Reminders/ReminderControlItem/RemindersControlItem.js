import React from "react";

export default class RemindersControllItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setChoiceReminderToFinished = () => {
    if (this.props.ReminderType !== "unfinished") {
      alert(
        "Bạn chỉ có thể chuyển 1 nhắc nhở chưa hoàn thành nhưng chưa hết hạn sang"
      );
    } else {
      this.props.socket.emit("send-choice-reminder-to-finished", {
        MemberID: this.props.MemberID,
        ReminderID: this.props.ReminderID,
        ReminderType: this.props.ReminderType
      });
      this.props.setCheckToChangeUnOrFinished("none");
    }
  };

  setChoiceReminderToUnFinished = () => {
    if (this.props.ReminderType !== "finished") {
      alert(
        "Bạn chỉ có thể chuyển 1 nhắc nhở hoàn thành nhưng chưa hết hạn sang"
      );
    } else {
      this.props.socket.emit("send-choice-reminder-to-unfinished", {
        MemberID: this.props.MemberID,
        ReminderID: this.props.ReminderID,
        ReminderType: this.props.ReminderType
      });
      this.props.setCheckToChangeUnOrFinished("none");
    }
  };

  render() {
    return (
      <div className="user-reminders_all__list___control-item">
        <div onClick={() => this.setChoiceReminderToFinished()}>
          <i className="material-icons">&#xe5cc;</i>
        </div>
        <div onClick={() => this.setChoiceReminderToUnFinished()}>
          <i className="material-icons">&#xe5cb;</i>
        </div>
      </div>
    );
  }
}
