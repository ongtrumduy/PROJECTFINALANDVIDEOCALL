import React from "react";
import axios from "axios";
import RemindersAllFinishedList from "../ReminderUnAndFinished/RemindersAllFinishedList";
import RemindersAllUnfinishedList from "../ReminderUnAndFinished/RemindersAllUnfinishedList";
import RemindersControlItem from "../ReminderControlItem/RemindersControlItem";

export default class RemindersAllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllReminderUnfinishedList: [],
      AllReminderFinishedList: [],
      ReminderChoiceID: "",
      ReminderChoiceType: "",
      checkToChangeUnOrFinished: ""
    };
  }

  componentDidMount = () => {
    axios
      .post("/getreminderlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          AllReminderUnfinishedList: res.data.MemberReminderUnfinishedList,
          AllReminderFinishedList: res.data.MemberReminderFinishedList
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.socket.on("update-reminder-list", data => {
      this.setState({
        AllReminderUnfinishedList: data.MemberReminderUnfinishedList,
        AllReminderFinishedList: data.MemberReminderFinishedList
      });
    });
  };

  setChooseReminderToChange = (reminderID, reminderType) => {
    this.setState({
      ReminderChoiceID: reminderID,
      ReminderChoiceType: reminderType
    });
  };

  setCheckToChangeUnOrFinished = changeType => {
    this.setState({
      checkToChangeUnOrFinished: changeType
    });
  };

  render() {
    return (
      <div className="user-reminders_all__list">
        <RemindersAllUnfinishedList
          AllReminderUnfinishedList={this.state.AllReminderUnfinishedList}
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          setChooseReminderToChange={this.setChooseReminderToChange}
          checkToChangeUnOrFinished={this.state.checkToChangeUnOrFinished}
          setCheckToChangeUnOrFinished={this.setCheckToChangeUnOrFinished}
        />
        <RemindersControlItem
          ReminderID={this.state.ReminderChoiceID}
          ReminderType={this.state.ReminderChoiceType}
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          setCheckToChangeUnOrFinished={this.setCheckToChangeUnOrFinished}
        />
        <RemindersAllFinishedList
          AllReminderFinishedList={this.state.AllReminderFinishedList}
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          setChooseReminderToChange={this.setChooseReminderToChange}
          checkToChangeUnOrFinished={this.state.checkToChangeUnOrFinished}
          setCheckToChangeUnOrFinished={this.setCheckToChangeUnOrFinished}
        />
      </div>
    );
  }
}
