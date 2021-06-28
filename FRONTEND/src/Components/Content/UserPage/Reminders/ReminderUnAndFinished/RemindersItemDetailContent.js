import React from "react";

export default class RemindersItemDetailContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-reminders_all__list___un-finished____reminder-item_____detail">
        <div className="user-reminders_all__list___un-finished____reminder-item_____detail______create-end-date">
          <div>
            <p>
              <span>Tạo:</span> {this.props.ReminderCreateDate}
            </p>
          </div>
          <div>
            <p>
              <span>Hết hạn: </span> {this.props.ReminderEndDate}
            </p>
          </div>
        </div>
        <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete">
          <div>
            <p>
              <span>Chi tiết:</span> {this.props.ReminderDescription}
            </p>
          </div>
          <div className="user-reminders_all__list___un-finished____reminder-item_____detail______content-delete_______delete">
            <span>Xóa</span>
          </div>
        </div>
      </div>
    );
  }
}
