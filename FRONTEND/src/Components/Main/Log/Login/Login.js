import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      PassWord: "",
      setHiddenPass: false,
      checkValidate: ""
    };
  }

  handleValueChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  pressEnterUsername = event => {
    if (event.key === "Enter") {
      this.sendRequestToLogin();
    }
  };

  pressEnterPassword = event => {
    if (event.key === "Enter") {
      this.sendRequestToLogin();
    }
  };

  handleLoginSubmit = event => {
    this.sendRequestToLogin();

    event.preventDefault();
  };

  setStateHiddenPass = () => {
    if (this.state.setHiddenPass) {
      this.setState({
        setHiddenPass: false
      });
    } else {
      this.setState({
        setHiddenPass: true
      });
    }
  };

  checkValidateLoginForm = type => {
    switch (type) {
      case "incorrect-password":
        return <span>Mật khẩu của bạn không đúng !!!</span>;
      case "non-existed-username":
        return <span>Tài khoản của bạn không tồn tại !!!</span>;
      case "success-login":
        return <span>Bạn đã đăng nhập thành công !!!</span>;
      case "username":
        return <small>Tên đăng nhập không được để trống</small>;
      case "password":
        return <small>Mật khẩu không được để trống</small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateLoginForm(type)}</div>;
    }
  };

  sendRequestToLogin = () => {
    axios
      .post("/login", {
        Username: this.state.Username,
        PassWord: this.state.PassWord
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-login") {
          setTimeout(() => {
            this.props.updateRenderLogPage("User");
          }, 1000);
          this.props.setMemberIDForMemberLogin(res.data.MemberID);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderLoginForm = () => {
    return (
      <div className="user-login">
        <form onSubmit={event => this.handleLoginSubmit(event)}>
          <div className="user-login_form">
            <p>
              Tên đăng nhập <span>(*)</span>
            </p>
            <input
              type="text"
              name="Username"
              maxLength="20"
              onChange={event => this.handleValueChange(event)}
              value={this.state.Username}
              onKeyPress={this.pressEnterUsername}
            />
            <div className="user-login_form__validate">
              {this.renderValidateNotify("username")}
            </div>

            <p>
              Mật khẩu <span>(*)</span>
            </p>
            <input
              style={{ width: "240px" }}
              name="PassWord"
              maxLength="20"
              type={(this.state.setHiddenPass && "text") || "password"}
              onChange={event => this.handleValueChange(event)}
              value={this.state.PassWord}
              onKeyPress={this.pressEnterPassword}
            />
            <i
              className="material-icons"
              style={{ cursor: "pointer" }}
              onClick={() => this.setStateHiddenPass()}
            >
              {(this.state.setHiddenPass && "visibility") || "visibility_off"}
            </i>
            <div className="user-login_form__validate">
              {this.renderValidateNotify("password")}
            </div>
          </div>
          <div className="user-login_form__response-login">
            {this.renderValidateNotify("incorrect-password")}
            {this.renderValidateNotify("non-existed-username")}
            {this.renderValidateNotify("success-login")}
          </div>

          <div className="user-login_button">
            <div className="user-login_button__loginbutton">
              <input type="submit" value="Đăng nhập" />
            </div>
            <div>
              <div className="user-login_button__forgotbutton">
                <input
                  type="button"
                  value="Quên mật khẩu?"
                  onClick={() => this.props.updateLoginPage("forgot")}
                />
              </div>
              <div className="user-login_button__registerbutton">
                <input
                  type="button"
                  value="Đăng kí"
                  onClick={() => this.props.updateLoginPage("register")}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.renderLoginForm()}</div>;
  }
}
