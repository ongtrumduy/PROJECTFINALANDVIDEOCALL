import React from "react";
import axios from "axios";

import Modal from "react-modal";

export default class ExcercisesCreateQAndAMainInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkConfirmCancelCreateNewIsOpen: false
    };
  }

  openCheckConfirmCancelCreateNewModal = () => {
    this.setState({
      checkConfirmCancelCreateNewIsOpen: true
    });
  };

  closeCheckConfirmCancelCreateNewModal = () => {
    this.setState({
      checkConfirmCancelCreateNewIsOpen: false
    });
  };

  cancelCreateNewExcercise = () => {
    axios
      .post("./cancelcreatenewexcercise", {
        MemberID: this.props.MemberID,
        ExcerciseType: this.props.ExcerciseType,
        Excercise: this.props.ExcerciseID
      })
      .then(res => {
        if (res.data.checkValidate === "remove-success") {
          setTimeout(() => {
            this.props.updateRenderExcerciseControl("excerciseall");
          }, 1000);
        }
      })
      .catch(error => console.log(error));
  };

  cancelCreateNewAndBackToList = () => {
    this.cancelCreateNewExcercise();
  };

  render() {
    return (
      <div className="user-excercises_create-new__QandA">
        <div
          className="user-excercises_create-new__QandA___backtoexcerciseall"
          onClick={() => this.openCheckConfirmCancelCreateNewModal()}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Hủy tạo </span>
          </div>
        </div>
        {/* <div className="user-excercises_create-new__QandA___infor">
          <div>
            <img src={this.props.ExcerciseLogo} alt="excercise-logo" />
          </div>
          <div>
            <p>Tên Bộ đề - Bài tập: {this.props.ExcerciseName}</p>
          </div>
          <div>
            <p>Số lượng câu hỏi: {this.props.ExcerciseNumberQuestion}</p>
          </div>
          <div>
            <p>
              Loại Bộ đề - Bài tập: &nbsp;
              {this.props.ExcerciseType === "public" ? "Công khai" : "Riêng tư"}
            </p>
          </div>
        </div> */}

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
          isOpen={this.state.checkConfirmCancelCreateNewIsOpen}
          onRequestClose={this.closeCheckConfirmCancelCreateNewModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có muốn hủy việc tạo Bài tập - Bộ đề mới không !!!!
            </p>
          </div>

          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.cancelCreateNewAndBackToList()}
          >
            Xác nhận
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckConfirmCancelCreateNewModal()}
          >
            Ấn nhầm!!!
          </button>
        </Modal>
      </div>
    );
  }
}
