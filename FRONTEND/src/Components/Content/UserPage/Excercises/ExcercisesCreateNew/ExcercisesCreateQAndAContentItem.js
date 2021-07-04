import React from "react";

import Modal from "react-modal";

export default class ExcercisesCreateQAndAContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseQuestionContent: "",
      ExcerciseAnswerContentA: "",
      ExcerciseAnswerContentB: "",
      ExcerciseAnswerContentC: "",
      ExcerciseAnswerContentD: "",
      ExcerciseCorrectAnswer: "",
      checkNonValueIsOpen: false,
      checkChooseTrueAnswerIsOpen: false,
      changeToEditMode: false
    };
  }

  openNonValueCheckModal = () => {
    this.setState({
      checkNonValueIsOpen: true
    });
  };

  closeNonValueCheckModal = () => {
    this.setState({
      checkNonValueIsOpen: false
    });
  };

  openChooseTrueAnswerModal = () => {
    this.setState({
      checkChooseTrueAnswerIsOpen: true
    });
  };

  closeChooseTrueAnswerModal = () => {
    this.setState({
      checkChooseTrueAnswerIsOpen: false
    });
  };

  handleChangeToEditMode = () => {
    this.setState({
      changeToEditMode: true,
      ExcerciseQuestionContent: this.props.ExcerciseQuestionContent,
      ExcerciseAnswerContentA: this.props.ExcerciseAnswerContentA,
      ExcerciseAnswerContentB: this.props.ExcerciseAnswerContentB,
      ExcerciseAnswerContentC: this.props.ExcerciseAnswerContentC,
      ExcerciseAnswerContentD: this.props.ExcerciseAnswerContentD,
      ExcerciseCorrectAnswer: ""
    });
  };

  handleValueExcerciseQAItem = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleValueExcerciseToAllQAContent = () => {
    if (
      Object.keys(this.state.ExcerciseQuestionContent).length === 0 ||
      Object.keys(this.state.ExcerciseAnswerContentA).length === 0 ||
      Object.keys(this.state.ExcerciseAnswerContentB).length === 0 ||
      Object.keys(this.state.ExcerciseAnswerContentC).length === 0 ||
      Object.keys(this.state.ExcerciseAnswerContentD).length === 0 ||
      Object.keys(this.state.ExcerciseCorrectAnswer).length === 0
    ) {
      this.openNonValueCheckModal();
    } else {
      this.openChooseTrueAnswerModal();
    }
  };

  confirmValueToSendToQAContent = () => {
    this.props.getAllQAContentToExcerciseContent(
      this.props.ExcerciseNthQuestion,
      this.state.ExcerciseQuestionContent,
      this.state.ExcerciseAnswerContentA,
      this.state.ExcerciseAnswerContentB,
      this.state.ExcerciseAnswerContentC,
      this.state.ExcerciseAnswerContentD,
      this.state.ExcerciseCorrectAnswer
    );
    this.setState({
      changeToEditMode: false
    });
    this.closeChooseTrueAnswerModal();
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.ExcerciseNthQuestion !== this.props.ExcerciseNthQuestion) {
      this.setState({
        ExcerciseQuestionContent: "",
        ExcerciseAnswerContentA: "",
        ExcerciseAnswerContentB: "",
        ExcerciseAnswerContentC: "",
        ExcerciseAnswerContentD: "",
        ExcerciseCorrectAnswer: "",
        changeToEditMode: false
      });
    }
  };

  createNewExcerciseQAContent = () => {
    return (
      <div className="user-excercises_create-new__QandA___content">
        <div className="user-excercises_create-new__QandA___content___question">
          <p>Câu hỏi số {this.props.ExcerciseNthQuestion}: </p>
          <textarea
            type="text"
            name="ExcerciseQuestionContent"
            maxLength="1000"
            value={
              this.props.ExcerciseQuestionContent === "" ||
              this.state.changeToEditMode
                ? this.state.ExcerciseQuestionContent
                : this.props.ExcerciseQuestionContent
            }
            onChange={event => this.handleValueExcerciseQAItem(event)}
            placeholder="Nhập nội dung câu hỏi..."
          />
        </div>
        <div className="user-excercises_create-new__QandA___content____answer">
          <div className="user-excercises_create-new__QandA___content____answer_____A">
            <div className="user-excercises_create-new__QandA___content____answer_____A______choose">
              <input
                type="radio"
                name="ExcerciseCorrectAnswer"
                value="A"
                checked={
                  this.props.ExcerciseCorrectAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseCorrectAnswer === "A"
                    : this.props.ExcerciseCorrectAnswer === "A"
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
              />
            </div>
            <div className="user-excercises_create-new__QandA___content____answer_____A______answer-content">
              <span>Đáp án A: </span>
              <textarea
                type="text"
                name="ExcerciseAnswerContentA"
                maxLength="500"
                value={
                  this.props.ExcerciseAnswerContentA === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseAnswerContentA
                    : this.props.ExcerciseAnswerContentA
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
                placeholder="Nhập nội dung đáp án A..."
              />
            </div>
          </div>
          <div className="user-excercises_create-new__QandA___content____answer_____B">
            <div className="user-excercises_create-new__QandA___content____answer_____B______choose">
              <input
                type="radio"
                name="ExcerciseCorrectAnswer"
                value="B"
                checked={
                  this.props.ExcerciseCorrectAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseCorrectAnswer === "B"
                    : this.props.ExcerciseCorrectAnswer === "B"
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
              />
            </div>
            <div className="user-excercises_create-new__QandA___content____answer_____B______answer-content">
              <span>Đáp án B: </span>
              <textarea
                type="text"
                name="ExcerciseAnswerContentB"
                maxLength="500"
                value={
                  this.props.ExcerciseAnswerContentB === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseAnswerContentB
                    : this.props.ExcerciseAnswerContentB
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
                placeholder="Nhập nội dung đáp án B..."
              />
            </div>
          </div>
          <div className="user-excercises_create-new__QandA___content____answer_____C">
            <div className="user-excercises_create-new__QandA___content____answer_____C______choose">
              <input
                type="radio"
                name="ExcerciseCorrectAnswer"
                value="C"
                checked={
                  this.props.ExcerciseCorrectAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseCorrectAnswer === "C"
                    : this.props.ExcerciseCorrectAnswer === "C"
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
              />
            </div>
            <div className="user-excercises_create-new__QandA___content____answer_____C______answer-content">
              <span>Đáp án C: </span>
              <textarea
                type="text"
                name="ExcerciseAnswerContentC"
                maxLength="500"
                value={
                  this.props.ExcerciseAnswerContentC === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseAnswerContentC
                    : this.props.ExcerciseAnswerContentC
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
                placeholder="Nhập nội dung đáp án C..."
              />
            </div>
          </div>
          <div className="user-excercises_create-new__QandA___content____answer_____D">
            <div className="user-excercises_create-new__QandA___content____answer_____D______choose">
              <input
                type="radio"
                name="ExcerciseCorrectAnswer"
                value="D"
                checked={
                  this.props.ExcerciseCorrectAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseCorrectAnswer === "D"
                    : this.props.ExcerciseCorrectAnswer === "D"
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
              />
            </div>
            <div className="user-excercises_create-new__QandA___content____answer_____D______answer-content">
              <span>Đáp án D: </span>
              <textarea
                type="text"
                name="ExcerciseAnswerContentD"
                maxLength="500"
                value={
                  this.props.ExcerciseAnswerContentD === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseAnswerContentD
                    : this.props.ExcerciseAnswerContentD
                }
                onChange={event => this.handleValueExcerciseQAItem(event)}
                placeholder="Nhập nội dung đáp án D..."
              />
            </div>
          </div>
        </div>
        <div className="user-excercises_create-new__QandA___content___confirm-content">
          {this.props.ExcerciseQuestionContent === "" ||
          this.state.changeToEditMode ? (
            <button onClick={() => this.handleValueExcerciseToAllQAContent()}>
              Xác nhận nội dung Câu số {this.props.ExcerciseNthQuestion}
            </button>
          ) : (
            <button onClick={() => this.handleChangeToEditMode()}>
              Chỉnh sửa nội dung Câu số {this.props.ExcerciseNthQuestion}
            </button>
          )}
        </div>

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
          isOpen={this.state.checkNonValueIsOpen}
          onRequestClose={this.closeNonValueCheckModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Không được để trống các nội dung trong câu hỏi !!!{" "}
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeNonValueCheckModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>

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
          isOpen={this.state.checkChooseTrueAnswerIsOpen}
          onRequestClose={this.closeChooseTrueAnswerModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Hãy chắc chắn bạn đã chọn đáp án đúng cho câu hỏi!!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeChooseTrueAnswerModal()}
          >
            Xem lại
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.confirmValueToSendToQAContent()}
          >
            Chắc chắn
          </button>
        </Modal>
      </div>
    );
  };

  render() {
    return <div>{this.createNewExcerciseQAContent()}</div>;
  }
}
