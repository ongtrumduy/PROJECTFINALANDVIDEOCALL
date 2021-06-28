import React from "react";

export default class ForgotPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        ForgotPassContent
        <button onClick={() => this.props.updateLoginPage("login")}>
          Quay lại
        </button>
      </div>
    );
  }
}
