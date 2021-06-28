import React from "react";
import "./Reminders.css";

import RemindersAllContent from "./ReminderAllContent/RemindersAllContent";
import RemindersCreateNew from "./ReminderCreateNew/RemindersCreateNew";

export default class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setReminderRender: "reminderall" };
  }

  updateRenderReminderControl = state => {
    this.setState({
      setReminderRender: state
    });
  };

  renderReminderControlContent = () => {
    switch (this.state.setReminderRender) {
      case "createnew":
        return (
          <RemindersCreateNew
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderReminderControl={this.updateRenderReminderControl}
          />
        );
      case "reminderall":
        return (
          <RemindersAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderReminderControl={this.updateRenderReminderControl}
          />
        );
      default:
        return (
          <RemindersAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderReminderControl={this.updateRenderReminderControl}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-reminders">
        {this.renderReminderControlContent()}
      </div>
    );
  }
}
