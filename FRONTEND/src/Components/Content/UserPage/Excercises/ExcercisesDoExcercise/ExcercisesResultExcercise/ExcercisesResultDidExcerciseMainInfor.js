import React from "react";
import Modal from "react-modal";

export default class ExcercisesResultDidExcerciseMainInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkBackResultExcerciseIsOpen: false };
  }

  openCheckBackResultExcerciseModal = () => {
    this.setState({
      checkBackResultExcerciseIsOpen: true
    });
  };

  closeCheckBackResultExcerciseModal = () => {
    this.setState({
      checkBackResultExcerciseIsOpen: false
    });
  };

  returnToExcerciseResultExcercise = () => {
    this.props.updateRenderExcerciseDoExcerciseControl("finishexcercise");
  };

  render() {
    return (
      <div className="user-excercises_do-excercise__QandA-result___main">
        <div
          className="user-excercises_do-excercise__QandA-result___main____backtoexcerciseall"
          onClick={() => this.openCheckBackResultExcerciseModal()}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay trở lại Xem kết quả </span>
          </div>
        </div>
        {/* <div className="user-excercises_do-excercise__QandA-result___infor">
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
              Loại Bộ đề - Bài tập:&nbsp;
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
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkBackResultExcerciseIsOpen}
          onRequestClose={this.closeCheckBackResultExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>CẢNH BÁO </p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có muốn trở lại giao diện xem kết quả không?
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckBackResultExcerciseModal()}
          >
            Hủy bỏ
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.returnToExcerciseResultExcercise()}
          >
            Chắc chắn!!!
          </button>
        </Modal>
      </div>
    );
  }
}
