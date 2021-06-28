import React from "react";

export default class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-activity_feed">
        <div className="user-activity_feed__title">
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>Sự kiện</p>
        </div>
        <div className="user-activity_feed__content">ActivityFeedContent</div>
      </div>
    );
  }
}
