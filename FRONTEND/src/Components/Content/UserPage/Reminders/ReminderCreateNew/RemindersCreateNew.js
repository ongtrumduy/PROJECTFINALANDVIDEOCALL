import React from "react";
import axios from "axios";

import warning111 from "../../../../Main/Image-Icons/11111a.png";
import warning222 from "../../../../Main/Image-Icons/22222b.png";
import warning333 from "../../../../Main/Image-Icons/33333c.png";
import warning444 from "../../../../Main/Image-Icons/44444d.png";
import warning555 from "../../../../Main/Image-Icons/55555e.png";

export default class RemindersCreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setWarningChoose: warning111,
      ReminderName: "",
      ReminderDescription: "",
      ReminderEndDate: "",
      checkValidate: ""
    };
  }

  handleChooseWarning = event => {
    const chooseWarning = event.target.value;
    this.setState({
      setWarningChoose: chooseWarning
    });
  };

  handleValueCreateNewReminder = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  sentToCreateNewReminder = () => {
    axios
      .post("/createnewreminder", {
        ReminderName: this.state.ReminderName,
        ReminderDescription: this.state.ReminderDescription,
        ReminderWarning: this.state.setWarningChoose,
        ReminderEndDate: this.state.ReminderEndDate,
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-create-reminder") {
          this.timeout = setTimeout(() => {
            this.props.updateRenderReminderControl("reminderall");
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillUnmount = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  handleCreateNewReminder = event => {
    this.sentToCreateNewReminder();

    event.preventDefault();
  };

  checkValidateCreateNewReminder = type => {
    switch (type) {
      case "success-create-reminder":
        return <span>Nh???c nh??? c???a b???n ???? ???????c t???o th??nh c??ng !!!</span>;
      case "non-pass-end-date":
        return <small>Ng??y h???t h???n c???a b???n kh??ng h???p l??? </small>;
      case "reminderenddate":
        return <small>Ng??y h???t h???n kh??ng ???????c ????? tr???ng </small>;
      case "remindername":
        return <small>T??n nh???c nh??? kh??ng ???????c ????? tr???ng </small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateCreateNewReminder(type)}</div>;
    }
  };

  createReminderForm = () => {
    return (
      <div className="user-reminders_create">
        <div
          className="user-reminders_create__backtoreminderall"
          onClick={() => this.props.updateRenderReminderControl("reminderall")}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay l???i</span>
          </div>
        </div>
        <form onSubmit={event => this.handleCreateNewReminder(event)}>
          <div className="user-reminders_create__reminder">
            <div className="user-reminders_create__reminder___form">
              <div>
                <p>T??n nh???c nh??? - ghi ch??</p>
                <input
                  type="text"
                  name="ReminderName"
                  onChange={event => this.handleValueCreateNewReminder(event)}
                  placeholder="Nh???p t??n nh???c nh???..."
                />
                <p>M?? t??? n???i dung nh???c nh???</p>
                <input
                  type="text"
                  name="ReminderDescription"
                  onChange={event => this.handleValueCreateNewReminder(event)}
                  placeholder="Nh???p m?? t???..."
                />
                <p>Ng??y h???t h???n nh???c nh???</p>
                <input
                  type="date"
                  name="ReminderEndDate"
                  onChange={event => this.handleValueCreateNewReminder(event)}
                  value={this.state.ReminderEndDate}
                />
                <p>Ch???n m???c ????? c???nh b??o cho nh???c nh???</p>
                <select
                  value={this.state.setWarningChoose}
                  onChange={event => this.handleChooseWarning(event)}
                >
                  <option value={warning111}>M???c 1</option>
                  <option value={warning222}>M???c 2</option>
                  <option value={warning333}>M???c 3</option>
                  <option value={warning444}>M???c 4</option>
                  <option value={warning555}>M???c 5</option>
                </select>
              </div>
              <div className="user-reminders_create__reminder___response-create-reminder">
                <div className="user-reminders_create__reminder___validate">
                  {this.renderValidateNotify("remindername")}
                  {this.renderValidateNotify("reminderenddate")}
                  {this.renderValidateNotify("non-pass-end-date")}
                </div>
                {this.renderValidateNotify("success-create-reminder")}
              </div>
              <div className="user-reminders_create__reminder___form____create-button">
                <input type="submit" value="T???o Nh???c nh???" />
              </div>
            </div>

            <div className="user-reminders_create__reminder___warning">
              <div>
                <img alt="reminder-warning" src={this.state.setWarningChoose} />
              </div>
              <div>
                <p>M???c ????? c???nh b??o nh???c nh???</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.createReminderForm()}</div>;
  }
}
