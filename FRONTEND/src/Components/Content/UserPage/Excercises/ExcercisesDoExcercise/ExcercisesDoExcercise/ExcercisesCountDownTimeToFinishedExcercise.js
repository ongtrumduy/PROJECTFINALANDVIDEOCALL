import React from "react";
import Modal from "react-modal";

export default class ExcercisesCountDownTimeToFinishedExcercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseMinutes: "00",
      ExcerciseSeconds: "00",
      checkAlertTimeUpIsOpen: false
    };
  }

  openCheckAlerTimeUpModal = () => {
    this.setState({
      checkAlertTimeUpIsOpen: true
    });
  };

  closeCheckAlerTimeUpModal = () => {
    this.setState({
      checkAlertTimeUpIsOpen: false
    });
  };

  componentDidMount = () => {
    let minutes = Number(this.props.TimeToDoExcercise) - 1;
    let seconds = 59;
    this.interval = setInterval(() => {
      seconds = seconds - 1;
      if (seconds === -1) {
        seconds = 59;
        minutes = minutes - 1;
      }
      if (seconds < 10) {
        this.setState({
          ExcerciseMinutes: minutes + "",
          ExcerciseSeconds: "0" + seconds
        });
      } else {
        this.setState({
          ExcerciseMinutes: minutes + "",
          ExcerciseSeconds: seconds + ""
        });
      }
      if (minutes === 0 && seconds === 0) {
        this.openCheckAlerTimeUpModal();
        setTimeout(() => {
          this.props.sendToFinishedExcerciseChoice();
        }, 1000);
      }
    }, 1000);
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            margin: "20px 0 -48px 0"
          }}
        >
          <span>Thời gian làm bài: </span>
          {this.state.ExcerciseMinutes} : {this.state.ExcerciseSeconds}
        </p>
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkAlertTimeUpIsOpen}
          onRequestClose={this.closeCheckAlerTimeUpModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã hết giờ làm bài mất rồi !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckAlerTimeUpModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
