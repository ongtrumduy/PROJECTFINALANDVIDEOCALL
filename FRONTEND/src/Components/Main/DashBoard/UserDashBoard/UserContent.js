import React from "react";
import Activities from "../../../Content/UserPage/Activities/Activities";
import Assignments from "../../../Content/UserPage/Assignments/Assignments";
import Chats from "../../../Content/UserPage/Chats/Chats";
import Excercises from "../../../Content/UserPage/Excercises/Excercises";
import Teams from "../../../Content/UserPage/Teams/Teams";
import Reminders from "../../../Content/UserPage/Reminders/Reminders";

export default class UserContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderUserContent = () => {
    switch (this.props.contentState) {
      case "activities":
        return (
          <Activities
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        );
      case "chats":
        return (
          <Chats MemberID={this.props.MemberID} socket={this.props.socket} />
        );
      case "teams":
        return (
          <Teams MemberID={this.props.MemberID} socket={this.props.socket} />
        );
      case "assignments":
        return (
          <Assignments
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        );
      case "excercises":
        return (
          <Excercises
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        );
      case "reminders":
        return (
          <Reminders
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        );
      default:
        return (
          <Teams MemberID={this.props.MemberID} socket={this.props.socket} />
        );
    }
  };

  render() {
    return (
      <div className="user-dashboard_container__content">
        {this.renderUserContent()}
      </div>
    );
  }
}
