import React from "react";
import RemindersAllList from "./RemindersAllList";

export default class RemindersAllContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-reminders_all">
        <div className="user-reminders_all__control">
          <div className="user-reminders_all__control___title">
            <p>Nhắc nhở - Ghi chú</p>
          </div>
          <div className="user-reminders_all__control___button">
            <button
              onClick={() =>
                this.props.updateRenderReminderControl("createnew")
              }
            >
              Tạo nhắc nhở mới
            </button>
          </div>
        </div>
        <RemindersAllList
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderReminderControl={this.props.updateRenderReminderControl}
        />
      </div>
    );
  }
}
