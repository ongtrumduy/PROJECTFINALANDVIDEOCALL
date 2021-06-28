import React from "react";
import Modal from "react-modal";

export default class ExcercisesDoExcerciseMainInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkDestroyDoExcerciseIsOpen: false };
  }

  openCheckDestroyDoExcerciseModal = () => {
    this.setState({
      checkDestroyDoExcerciseIsOpen: true
    });
  };

  closeCheckDestroyDoExcerciseModal = () => {
    this.setState({
      checkDestroyDoExcerciseIsOpen: false
    });
  };

  render() {
    return (
      <div className="user-excercises_do-excercise__QandA">
        <div
          className="user-excercises_do-excercise__QandA___backtoexcerciseall"
          onClick={() => this.openCheckDestroyDoExcerciseModal()}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Hủy làm bài </span>
          </div>
        </div>
        {/* <div className="user-excercises_do-excercise__QandA___infor">
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
              Loại Bộ đề - Bài tập: 
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
          isOpen={this.state.checkDestroyDoExcerciseIsOpen}
          onRequestClose={this.closeCheckDestroyDoExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>CẢNH BÁO </p>
            <p style={{ fontWeight: "bold" }}>
              Khi hủy quá trình làm bài sẽ hủy toàn bộ quá trình làm bài của
              bạn. Bạn có chắc chắn muốn hủy quá trình làm bài không???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckDestroyDoExcerciseModal()}
          >
            Hủy bỏ
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() =>
              this.props.updateRenderExcerciseControl("excerciseall")
            }
          >
            Chắc chắn!!!
          </button>
        </Modal>
      </div>
    );
  }
}
