import React from "react";
import RemindersFinishedItem from "./RemindersFinishedItem";

export default class RemindersAllFinishedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReminderChoiceID: ""
    };
  }

  setChooseReminderToChangeIcon = reminderChoiceID => {
    this.setState({
      ReminderChoiceID: reminderChoiceID
    });
  };

  render() {
    return (
      <div className="user-reminders_all__list___finished">
        <p style={{ fontWeight: "bold" }}>Đã hoàn thành hoặc hết hạn</p>
        {this.props.AllReminderFinishedList.map(
          (reminderitem, reminderindex) => (
            <RemindersFinishedItem
              key={reminderindex}
              ReminderID={reminderitem.ReminderID}
              ReminderChoiceID={this.state.ReminderChoiceID}
              ReminderType={reminderitem.ReminderType}
              ReminderWarning={reminderitem.ReminderWarning}
              ReminderName={reminderitem.ReminderName}
              ReminderDescription={reminderitem.ReminderDescription}
              ReminderEndDate={reminderitem.ReminderEndDate}
              ReminderCreateDate={reminderitem.ReminderCreateDate}
              setChooseReminderToChange={this.props.setChooseReminderToChange}
              setChooseReminderToChangeIcon={this.setChooseReminderToChangeIcon}
              setCheckToChangeUnOrFinished={
                this.props.setCheckToChangeUnOrFinished
              }
              checkToChangeUnOrFinished={this.props.checkToChangeUnOrFinished}
            />
          )
        )}
      </div>
    );
  }
}
