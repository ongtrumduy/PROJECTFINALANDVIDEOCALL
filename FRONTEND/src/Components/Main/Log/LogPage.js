import React from "react";
import ForgotPass from "./ForgotPass/ForgotPass";
import Login from "./Login/Login";
import Register from "./Register/Register";

import "./Login/Login.css";
import "./Register/Register.css";

export default class LogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSign: "login"
    };
  }

  updateLogPage = () => {
    switch (this.state.checkSign) {
      case "register":
        return <Register updateLoginPage={this.updateLoginPage} />;
      case "forgot":
        return <ForgotPass updateLoginPage={this.updateLoginPage} />;
      case "login":
        return (
          <Login
            updateLoginPage={this.updateLoginPage}
            updateRenderLogPage={this.props.updateRenderLogPage}
            setMemberIDForMemberLogin={this.props.setMemberIDForMemberLogin}
          />
        );
      default:
        return (
          <Login
            updateLoginPage={this.updateLoginPage}
            updateRenderLogPage={this.props.updateRenderLogPage}
          />
        );
    }
  };

  updateLoginPage = state => {
    this.setState({
      checkSign: state
    });
  };

  render() {
    return <div>{this.updateLogPage()}</div>;
  }
}
