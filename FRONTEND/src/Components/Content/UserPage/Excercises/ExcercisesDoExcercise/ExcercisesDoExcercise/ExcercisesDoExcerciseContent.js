import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesDoExcerciseContentItem from "./ExcercisesDoExcerciseContentItem";
import ExcercisesDoExcerciseMainInfor from "./ExcercisesDoExcerciseMainInfor";
import ExcerciseCountDownTimeToFinishedExcercise from "./ExcercisesCountDownTimeToFinishedExcercise";

export default class ExcercisesDoExcerciseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseAllAnswerContent: [],
      ExcerciseNthQuestion: "1",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false,
      checkCompleteExcerciseIsOpen: false,
      checkCountDownToTimeUp: false,
      checkDidAnswerQuestIsOpen: false,
      checkDidAnswerQuest: false
    };
  }

  componentDidMount = () => {
    // console.log("Sang số câu hỏi ", this.props.ExcerciseNumberQuestion);
    if (this.props.ExcerciseNumberQuestion === "1") {
      this.setState({
        checkValidateNextRight: true
      });
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    // console.log("Sang số câu hỏi ", nextProps.ExcerciseNumberQuestion);

    if (nextProps.ExcerciseNumberQuestion === "1") {
      this.setState({
        checkValidateNextRight: true
      });
    }
  };

  openCheckDidAnswerQuestModal = () => {
    this.setState({
      checkDidAnswerQuestIsOpen: true
    });
  };

  closeCheckDidAnswerQuestModal = () => {
    this.setState({
      checkDidAnswerQuestIsOpen: false
    });
  };

  openCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: true
    });
  };

  closeCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: false
    });
  };

  openOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: true
    });
  };

  closeOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: false
    });
  };

  setCheckDidAnswerQuest = () => {
    this.setState({
      checkDidAnswerQuest: true
    });
  };

  nextToNthQuestionOnRight = () => {
    if (this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidateNextRight) {
        if (
          Number(this.state.ExcerciseNthQuestion) + 1 + "" ===
          this.props.ExcerciseNumberQuestion
        ) {
          this.setState({
            checkValidateNextRight: true
          });
        }

        this.setState({
          ExcerciseNthQuestion:
            Number(this.state.ExcerciseNthQuestion) + 1 + "",
          checkValidatePrevLeft: false
        });
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  prevToNthQuestionOnLeft = () => {
    if (this.state.checkDidAnswerQuest) {
      this.openCheckDidAnswerQuestModal();
    } else {
      if (!this.state.checkValidatePrevLeft) {
        if (Number(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
          this.setState({
            checkValidatePrevLeft: true
          });
        }

        this.setState({
          ExcerciseNthQuestion:
            Number(this.state.ExcerciseNthQuestion) - 1 + "",
          checkValidateNextRight: false
        });
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  getAllAnswerExcerciseOfMemberContent = (
    excerciseNthQuestion,
    excerciseChoiceAnswer,
    excerciseCorrectAnswer
  ) => {
    let AnswerContent = {
      ExcerciseNthQuestion: excerciseNthQuestion,
      ExcerciseChoiceAnswer: excerciseChoiceAnswer,
      ExcerciseCorrectAnswer: excerciseCorrectAnswer
    };
    let nthindex = this.state.ExcerciseAllAnswerContent.findIndex(
      answeritem => {
        return answeritem.ExcerciseNthQuestion === excerciseNthQuestion;
      }
    );
    if (nthindex >= 0) {
      this.state.ExcerciseAllAnswerContent.splice(nthindex, 1, AnswerContent);
      this.setState({
        ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent,
        checkDidAnswerQuest: false
      });
    } else {
      this.setState({
        ExcerciseAllAnswerContent: [
          ...this.state.ExcerciseAllAnswerContent,
          AnswerContent
        ],
        checkDidAnswerQuest: false
      });
    }
  };

  sendToFinishedExcerciseChoice = () => {
    axios
      .post("/finishedexcercisechoiceanswer", {
        ExcerciseID: this.props.ExcerciseID,
        MemberID: this.props.MemberID,
        TimeToDoExcercise: this.props.TimeToDoExcercise,
        ExcerciseAllAnswerContent: this.state.ExcerciseAllAnswerContent,
        ExcerciseNumberQuestion: this.props.ExcerciseNumberQuestion
      })
      .then(res => {
        // console.log("Ra data về ", res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-finished-excercise-choice") {
          this.props.getExcerciseMemberDidResultOfThisExcercise(
            res.data.ExcerciseMemberDidResult
          );

          // this.props.socket.emit("receive-to-update-excercise-of-assignment", {
          //   MemberID: this.props.MemberID,
          //   ExcerciseID: this.props.ExcerciseID
          // });

          this.timeout = setTimeout(() => {
            this.props.updateRenderExcerciseDoExcerciseControl(
              "finishexcercise"
            );
          }, 800);
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.props.getAllChoiceAndCorrectAnswerList(
      this.state.ExcerciseAllAnswerContent
    );
  };

  componentWillUnmount = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  excerciseDoExcerciseControl = () => {
    return (
      <div className="user-excercises_do-excercise__QandA___control">
        <div>
          <i
            style={
              this.state.checkValidatePrevLeft
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.prevToNthQuestionOnLeft()}
            className="material-icons"
          >
            &#xe5c4;
          </i>
        </div>
        <div>
          <i
            style={
              this.state.checkValidateNextRight
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.nextToNthQuestionOnRight()}
            className="material-icons"
          >
            &#xe5c8;
          </i>
        </div>
        <div>
          <input
            type="button"
            value="Hoàn tất"
            onClick={() => this.openCheckCompleteExcerciseModal()}
          />
        </div>
      </div>
    );
  };

  renderExcercisesDoExcerciseContentItem = () => {
    let nthindex = this.props.ExcerciseAllQAContent.findIndex(questansitem => {
      return (
        questansitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion
      );
    });

    if (nthindex >= 0) {
      let nthanswerindex = this.state.ExcerciseAllAnswerContent.findIndex(
        questansitem => {
          return (
            questansitem.ExcerciseNthQuestion ===
            this.state.ExcerciseNthQuestion
          );
        }
      );

      if (this.state.ExcerciseAllAnswerContent[nthanswerindex]) {
        return (
          <ExcercisesDoExcerciseContentItem
            ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
            getAllAnswerExcerciseOfMemberContent={
              this.getAllAnswerExcerciseOfMemberContent
            }
            ExcerciseCorrectAnswer={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
            }
            ExcerciseQuestionContent={
              this.props.ExcerciseAllQAContent[nthindex]
                .ExcerciseQuestionContent
            }
            ExcerciseAnswerContentA={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
            }
            ExcerciseAnswerContentB={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
            }
            ExcerciseAnswerContentC={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
            }
            ExcerciseAnswerContentD={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
            }
            ExcerciseChoiceAnswer={
              this.state.ExcerciseAllAnswerContent[nthanswerindex]
                .ExcerciseChoiceAnswer
            }
            setCheckDidAnswerQuest={this.setCheckDidAnswerQuest}
          />
        );
      } else {
        return (
          <ExcercisesDoExcerciseContentItem
            ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
            getAllAnswerExcerciseOfMemberContent={
              this.getAllAnswerExcerciseOfMemberContent
            }
            ExcerciseCorrectAnswer={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
            }
            ExcerciseQuestionContent={
              this.props.ExcerciseAllQAContent[nthindex]
                .ExcerciseQuestionContent
            }
            ExcerciseAnswerContentA={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
            }
            ExcerciseAnswerContentB={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
            }
            ExcerciseAnswerContentC={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
            }
            ExcerciseAnswerContentD={
              this.props.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
            }
            ExcerciseChoiceAnswer=""
            setCheckDidAnswerQuest={this.setCheckDidAnswerQuest}
          />
        );
      }
    }
  };

  excerciseDoExcerciseContent = () => {
    return (
      <div className="user-excercises_do-excercise__QandA">
        <ExcerciseCountDownTimeToFinishedExcercise
          TimeToDoExcercise={this.props.TimeToDoExcercise}
          updateRenderExcerciseDoExcerciseControl={
            this.props.updateRenderExcerciseDoExcerciseControl
          }
          sendToFinishedExcerciseChoice={this.sendToFinishedExcerciseChoice}
        />
        <ExcercisesDoExcerciseMainInfor
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderExcerciseControl={this.props.updateRenderExcerciseControl}
          ExcerciseID={this.props.ExcerciseID}
          // ExcerciseName={this.props.ExcerciseName}
          // ExcerciseNumberQuestion={this.props.ExcerciseNumberQuestion}
          // ExcerciseType={this.props.ExcerciseType}
          // ExcerciseLogo={this.props.ExcerciseLogo}
        />

        {this.renderExcercisesDoExcerciseContentItem()}
        {this.excerciseDoExcerciseControl()}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.excerciseDoExcerciseContent()}
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
          isOpen={this.state.overNumberQuestionIsOpen}
          onRequestClose={this.closeOverNumberQuestionModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Không thể vượt quá số lượng câu hỏi của Bộ đề - Bài tập !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeOverNumberQuestionModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
        {/*================================================================================= */}
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
          isOpen={this.state.checkCompleteExcerciseIsOpen}
          onRequestClose={this.closeCheckCompleteExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Hãy chắc chắn các câu trả lời bạn đã xác nhận. Bạn có chính xác
              muốn nộp bài không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToFinishedExcerciseChoice()}
          >
            Nộp bài
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCompleteExcerciseModal()}
          >
            Ấn nhầm!!!
          </button>
        </Modal>

        {/*================================================================================= */}

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
          isOpen={this.state.checkDidAnswerQuestIsOpen}
          onRequestClose={this.closeCheckDidAnswerQuestModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa xác nhận trả lời câu hỏi số &nbsp;
              {this.state.ExcerciseNthQuestion} này !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckDidAnswerQuestModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
