import React from "react";
import Modal from "react-modal";

export default class ExcercisesDoExcerciseContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseChoiceAnswer: "",
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
      ExcerciseChoiceAnswer: this.props.ExcerciseChoiceAnswer
    });
  };

  handleValueAnswerItem = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.value !== "") {
      this.props.setCheckDidAnswerQuest();
    }
  };

  handleValueExcerciseToAllAnswerContent = () => {
    if (Object.keys(this.state.ExcerciseChoiceAnswer).length === 0) {
      this.openNonValueCheckModal();
    } else {
      this.openChooseTrueAnswerModal();
    }
  };

  confirmValueToSendToAnswerContent = () => {
    this.props.getAllAnswerExcerciseOfMemberContent(
      this.props.ExcerciseNthQuestion,
      this.state.ExcerciseChoiceAnswer,
      this.props.ExcerciseCorrectAnswer
    );
    this.setState({
      changeToEditMode: false
    });
    this.closeChooseTrueAnswerModal();
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.ExcerciseNthQuestion !== this.props.ExcerciseNthQuestion) {
      this.setState({
        ExcerciseChoiceAnswer: "",
        changeToEditMode: false
      });
    }
  };

  doNewExcerciseQAContent = () => {
    return (
      <div className="user-excercises_do-excercise__QandA___content">
        <div className="user-excercises_do-excercise__QandA___content___question">
          <p>Câu hỏi số {this.props.ExcerciseNthQuestion}: </p>
          <span> {this.props.ExcerciseQuestionContent}</span>
        </div>
        <div className="user-excercises_do-excercise__QandA___content____answer">
          <div className="user-excercises_do-excercise__QandA___content____answer_____A">
            <div className="user-excercises_do-excercise__QandA___content____answer_____A______choose">
              <input
                type="radio"
                name="ExcerciseChoiceAnswer"
                value="A"
                checked={
                  this.props.ExcerciseChoiceAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseChoiceAnswer === "A"
                    : this.props.ExcerciseChoiceAnswer === "A"
                }
                onChange={event => this.handleValueAnswerItem(event)}
              />
            </div>
            <div className="user-excercises_do-excercise__QandA___content____answer_____A______answer-content">
              <span>Đáp án A: </span>
              <span>{this.props.ExcerciseAnswerContentA}</span>
            </div>
          </div>
          <div className="user-excercises_do-excercise__QandA___content____answer_____B">
            <div className="user-excercises_do-excercise__QandA___content____answer_____B______choose">
              <input
                type="radio"
                name="ExcerciseChoiceAnswer"
                value="B"
                checked={
                  this.props.ExcerciseChoiceAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseChoiceAnswer === "B"
                    : this.props.ExcerciseChoiceAnswer === "B"
                }
                onChange={event => this.handleValueAnswerItem(event)}
              />
            </div>
            <div className="user-excercises_do-excercise__QandA___content____answer_____B______answer-content">
              <span>Đáp án B: </span>
              <span>{this.props.ExcerciseAnswerContentB}</span>
            </div>
          </div>
          <div className="user-excercises_do-excercise__QandA___content____answer_____C">
            <div className="user-excercises_do-excercise__QandA___content____answer_____C______choose">
              <input
                type="radio"
                name="ExcerciseChoiceAnswer"
                value="C"
                checked={
                  this.props.ExcerciseChoiceAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseChoiceAnswer === "C"
                    : this.props.ExcerciseChoiceAnswer === "C"
                }
                onChange={event => this.handleValueAnswerItem(event)}
              />
            </div>
            <div className="user-excercises_do-excercise__QandA___content____answer_____C______answer-content">
              <span>Đáp án C: </span>
              <span>{this.props.ExcerciseAnswerContentC}</span>
            </div>
          </div>
          <div className="user-excercises_do-excercise__QandA___content____answer_____D">
            <div className="user-excercises_do-excercise__QandA___content____answer_____D______choose">
              <input
                type="radio"
                name="ExcerciseChoiceAnswer"
                value="D"
                checked={
                  this.props.ExcerciseChoiceAnswer === "" ||
                  this.state.changeToEditMode
                    ? this.state.ExcerciseChoiceAnswer === "D"
                    : this.props.ExcerciseChoiceAnswer === "D"
                }
                onChange={event => this.handleValueAnswerItem(event)}
              />
            </div>
            <div className="user-excercises_do-excercise__QandA___content____answer_____D______answer-content">
              <span>Đáp án D: </span>
              <span>{this.props.ExcerciseAnswerContentD}</span>
            </div>
          </div>
        </div>
        <div className="user-excercises_do-excercise__QandA___content___confirm-content">
          {this.props.ExcerciseChoiceAnswer === "" ||
          this.state.changeToEditMode ? (
            <button
              onClick={() => this.handleValueExcerciseToAllAnswerContent()}
            >
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
              backgroundColor: "#ecf0f1"
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
              backgroundColor: "#ecf0f1"
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
            onClick={() => this.confirmValueToSendToAnswerContent()}
          >
            Chắc chắn
          </button>
        </Modal>
      </div>
    );
  };

  render() {
    return <div>{this.doNewExcerciseQAContent()}</div>;
  }
}
