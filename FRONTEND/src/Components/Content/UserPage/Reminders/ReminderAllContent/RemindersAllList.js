import React from "react";
import axios from "axios";
import RemindersAllFinishedList from "../ReminderUnAndFinished/RemindersAllFinishedList";
import RemindersAllUnfinishedList from "../ReminderUnAndFinished/RemindersAllUnfinishedList";
import RemindersControlItem from "../ReminderControlItem/RemindersControlItem";

export default class RemindersAllList extends React.Component {
  constructor(props) {
    super(props);
    this.axiosmounted = false;
    this.mounted = false;
    this.state = {
      AllReminderUnfinishedList: [],
      AllReminderFinishedList: [],
      ReminderChoiceID: "",
      ReminderChoiceType: "",
      checkToChangeUnOrFinished: "",
      checkLoadingReminderList: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;
    axios
      .post("/getreminderlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        if (this.axiosmounted) {
          this.setState({
            AllReminderUnfinishedList: res.data.MemberReminderUnfinishedList,
            AllReminderFinishedList: res.data.MemberReminderFinishedList
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingReminderList: true
      });
    }, 1000);

    this.mounted = true;

    this.props.socket.on("update-reminder-list", data => {
      if (this.mounted) {
        if (this.props.MemberID === data.MemberID) {
          this.setState({
            AllReminderUnfinishedList: data.MemberReminderUnfinishedList,
            AllReminderFinishedList: data.MemberReminderFinishedList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.axiosmounted = false;
    this.mounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
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
      <div style={{ width: "100%", height: "100%" }}>
        {this.state.checkLoadingReminderList ? (
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
        ) : (
          <p style={{ color: "blue", fontWeight: "bold", textAlign: "center" }}>
            Đang tải dữ liệu các Nhắc nhở-Ghi chú....
          </p>
        )}
      </div>
    );
  }
}
