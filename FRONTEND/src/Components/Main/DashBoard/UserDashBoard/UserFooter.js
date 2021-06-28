import React from "react";

export default class UserFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-dashboard_footer">
        <p>
          Design by Project Final -
          <a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a> - Đại
          học Bách khoa Hà Nội
        </p>
      </div>
    );
  }
}
