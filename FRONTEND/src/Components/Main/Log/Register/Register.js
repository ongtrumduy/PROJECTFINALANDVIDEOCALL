import React from "react";
import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Firstname: "",
      Lastname: "",
      PhoneNumber: "",
      PassWord: "",
      Birthday: "",
      Gender: "",
      setHiddenPass: false,
      checkValidate: ""
    };
  }

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

  handleValueChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGenderChange = event => {
    this.setState({
      Gender: event.target.value
    });
  };

  handleRegisterSubmit = event => {
    this.sentRegisterNewMember();

    event.preventDefault();
  };

  checkValidateRegisterForm = type => {
    switch (type) {
      case "existed-username":
        return <span>Tên đăng nhập này đã được sử dụng !!!</span>;
      case "success-register":
        return <span>Bạn đã đăng kí thành công !!!</span>;
      case "existed-phonenumber":
        return <span>Số điện thoại này đã được sử dụng !!!</span>;
      case "username":
        return <small>Tên đăng nhập không được để trống</small>;
      case "password":
        return <small>Mật khẩu không được để trống</small>;
      case "firstname":
        return <small>Tên không được để trống</small>;
      case "lastname":
        return <small>Họ không được để trống</small>;
      case "phonenumber":
        return <small>Số điện thoại không được để trống</small>;
      case "birthday":
        return <small>Ngày sinh không được để trống</small>;
      case "gender":
        return <small>Giới tính không được để trống</small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateRegisterForm(type)}</div>;
    }
  };

  sentRegisterNewMember = () => {
    axios
      .post("/register", {
        Username: this.state.Username,
        PassWord: this.state.PassWord,
        Firstname: this.state.Firstname,
        Lastname: this.state.Lastname,
        PhoneNumber: this.state.PhoneNumber,
        Birthday: this.state.Birthday,
        Gender: this.state.Gender
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-register") {
          setTimeout(() => {
            this.props.updateLoginPage("login");
          }, 1500);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderRegisterForm = () => {
    return (
      <div className="user-register">
        <form onSubmit={event => this.handleRegisterSubmit(event)}>
          <div className="user-register_form">
            <div
              className="user-register_button__returnloginbutton"
              onClick={() => this.props.updateLoginPage("login")}
            >
              <div>
                <i className="material-icons"> &#xe5c4;</i>
              </div>
              <div>Quay lại</div>
            </div>

            <div className="user-register_form__form1">
              <p>
                Tên đăng nhập <span>(*)</span>
              </p>
              <input
                type="text"
                name="Username"
                maxLength="20"
                onChange={event => this.handleValueChange(event)}
                value={this.state.Username}
              />
              <div className="user-register_form__validate">
                {this.renderValidateNotify("username")}
              </div>
              <p>
                Họ và tên <span>(*)</span>
              </p>
              <div className="user-register_form__fullname">
                <div className="user-register_form__fullname___lastname">
                  <input
                    type="text"
                    name="Lastname"
                    maxLength="10"
                    onChange={event => this.handleValueChange(event)}
                    value={this.state.Lastname}
                    placeholder="Họ"
                  />
                </div>
                <div className="user-register_form__fullname___fisrtname">
                  <input
                    type="text"
                    name="Firstname"
                    maxLength="10"
                    onChange={event => this.handleValueChange(event)}
                    value={this.state.Firstname}
                    placeholder="Tên"
                  />
                </div>
              </div>
              <div className="user-register_form__validate">
                {this.renderValidateNotify("firstname")}
              </div>
              <div className="user-register_form__validate">
                {this.renderValidateNotify("lastname")}
              </div>
              <p>
                Giới tính <span>(*)</span>
              </p>
              <div className="user-register_form__genderchoose">
                <select
                  value={this.state.Gender}
                  onChange={event => this.handleGenderChange(event)}
                >
                  <option value="">Chọn</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <br></br>
              <div className="user-register_form__validate">
                {this.renderValidateNotify("gender")}
              </div>
            </div>

            <div className="user-register_form__form2">
              <p>
                Số điện thoại <span>(*)</span>
              </p>
              <input
                type="text"
                name="PhoneNumber"
                maxLength="12"
                onChange={event => this.handleValueChange(event)}
                value={this.state.PhoneNumber}
              />
              <div className="user-register_form__validate">
                {this.renderValidateNotify("phonenumber")}
              </div>
              <p>
                Mật khẩu <span>(*)</span>
              </p>
              <input
                style={{ width: "240px" }}
                type={(this.state.setHiddenPass && "text") || "password"}
                name="PassWord"
                maxLength="20"
                onChange={event => this.handleValueChange(event)}
                value={this.state.PassWord}
              />
              <i
                className="material-icons"
                style={{ cursor: "pointer" }}
                onClick={() => this.setStateHiddenPass()}
              >
                {(this.state.setHiddenPass && "visibility") || "visibility_off"}
              </i>
              <div className="user-register_form__validate">
                {this.renderValidateNotify("password")}
              </div>
              <p>
                Ngày sinh <span>(*)</span>
              </p>
              <input
                type="date"
                name="Birthday"
                onChange={event => this.handleValueChange(event)}
                value={this.state.Birthday}
              />
              <div className="user-register_form__validate">
                {this.renderValidateNotify("birthday")}
              </div>
            </div>
          </div>
          <div className="user-register_form__response-register">
            {this.renderValidateNotify("existed-username")}
            {this.renderValidateNotify("existed-phonenumber")}
            {this.renderValidateNotify("success-register")}
          </div>
          <div className="user-register_button__registerbutton">
            <input type="submit" value="Đăng kí" />
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.renderRegisterForm()}</div>;
  }
}
