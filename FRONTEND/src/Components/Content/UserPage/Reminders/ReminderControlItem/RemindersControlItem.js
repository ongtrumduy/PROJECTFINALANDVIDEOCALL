import React from "react";
import Modal from "react-modal";

export default class RemindersControllItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCanNotChangeToFinishedIsOpen: false,
      modalCanNotChangeToUnfinishedIsOpen: false
    };
  }

  openCanNotChangeToFinishedModal = () => {
    this.setState({
      modalCanNotChangeToFinishedIsOpen: true
    });
  };

  closeCanNotChangeToFinishedModal = () => {
    this.setState({
      modalCanNotChangeToFinishedIsOpen: false
    });
  };

  openCanNotChangeToUnfinishedModal = () => {
    this.setState({
      modalCanNotChangeToUnfinishedIsOpen: true
    });
  };

  closeCanNotChangeToUnfinishedModal = () => {
    this.setState({
      modalCanNotChangeToUnfinishedIsOpen: false
    });
  };

  setChoiceReminderToFinished = () => {
    if (
      this.props.ReminderType !== "unfinished" ||
      this.props.checkToChangeUnOrFinished === "none"
    ) {
      this.openCanNotChangeToFinishedModal();
    } else {
      this.props.socket.emit("send-choice-reminder-to-finished", {
        MemberID: this.props.MemberID,
        ReminderID: this.props.ReminderID,
        ReminderType: this.props.ReminderType
      });
      this.props.setCheckToChangeUnOrFinished("none");
    }
  };

  setChoiceReminderToUnFinished = () => {
    if (
      this.props.ReminderType !== "finished" ||
      this.props.checkToChangeUnOrFinished === "none"
    ) {
      this.openCanNotChangeToUnfinishedModal();
    } else {
      this.props.socket.emit("send-choice-reminder-to-unfinished", {
        MemberID: this.props.MemberID,
        ReminderID: this.props.ReminderID,
        ReminderType: this.props.ReminderType
      });
      this.props.setCheckToChangeUnOrFinished("none");
    }
  };

  render() {
    return (
      <div className="user-reminders_all__list___control-item">
        <div onClick={() => this.setChoiceReminderToFinished()}>
          <i className="material-icons">&#xe5cc;</i>
        </div>
        <div onClick={() => this.setChoiceReminderToUnFinished()}>
          <i className="material-icons">&#xe5cb;</i>
        </div>

        {/*================================================================================================== */}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.modalCanNotChangeToFinishedIsOpen}
          onRequestClose={this.closeCanNotChangeToFinishedModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chỉ có thể chuyển 1 nhắc nhở chưa hoàn thành và chưa hết hạn
              sang
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCanNotChangeToFinishedModal()}
          >
            Đã hiểu
          </button>
        </Modal>
        {/*================================================================================================== */}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.modalCanNotChangeToUnfinishedIsOpen}
          onRequestClose={this.closeCanNotChangeToUnfinishedModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chỉ có thể chuyển 1 nhắc nhở hoàn thành và chưa hết hạn sang
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCanNotChangeToUnfinishedModal()}
          >
            Đã hiểu
          </button>
        </Modal>
        {/*================================================================================================== */}
      </div>
    );
  }
}
