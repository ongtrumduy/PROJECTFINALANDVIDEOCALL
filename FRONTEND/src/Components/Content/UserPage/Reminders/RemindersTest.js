import React from "react";

export default class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
  }

  componentDidMount() {
    window.notification = null;
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification = () => {
    var options = {
      body: "This is the body of the Notification",
      icon:
        "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr"
    };
    let notification = new Notification("Notification Demo", options);

    this.setState(prevstate => {
      let notifications = prevstate.notifications;
      notifications.push(notification);
      return {
        notifications
      };
    });
  };

  closeNotification = () => {
    this.state.notifications.map(item => {
      item.close();
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.showNotification()}>
          Click to show notification
        </button>
        <button onClick={() => this.closeNotification()}>
          Click to show notification
        </button>
      </div>
    );
  }
}
