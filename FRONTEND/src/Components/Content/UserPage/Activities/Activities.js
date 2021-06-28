import React from "react";
import ActivityFeed from "./ActivityFeed";
import ActivityContent from "./ActivityContent";
import "./Activities.css";

export default class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-activity">
        <ActivityFeed />
        <ActivityContent />
      </div>
    );
  }
}
