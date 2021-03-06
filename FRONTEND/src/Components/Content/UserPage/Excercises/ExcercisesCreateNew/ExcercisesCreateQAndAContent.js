import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesCreateQAndAContentItem from "./ExcercisesCreateQAndAContentItem";
import ExcercisesCreateQAndAMainInfor from "./ExcercisesCreateQAndAMainInfor";

export default class ExcercisesCreateQAndAContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseAllQAContent: [],
      ExcerciseNthQuestion: "1",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false,
      checkQAContentNextQuestIsOpen: false,
      checkTrueOrderQuestion: false,
      checkCompleteExcerciseIsOpen: false,
      checkCompleteAllExcerciseAllQAContentIsOpen: false
    };
  }

  componentDidMount = () => {
    if (this.props.ExcerciseNumberQuestion === "1") {
      this.setState({
        checkValidateNextRight: true
      });
    }
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

  openCheckCompleteAllExcerciseAllQAContentIsOpenModal = () => {
    this.setState({
      checkCompleteAllExcerciseAllQAContentIsOpen: true
    });
  };

  closeCheckCompleteAllExcerciseAllQAContentIsOpenModal = () => {
    this.setState({
      checkCompleteAllExcerciseAllQAContentIsOpen: false
    });
  };

  openCheckQAContentNextQuestModal = () => {
    this.setState({
      checkQAContentNextQuestIsOpen: true
    });
  };

  closeCheckQAContentNextQuestModal = () => {
    this.setState({
      checkQAContentNextQuestIsOpen: false
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

  nextToNthQuestionOnRight = () => {
    if (!this.state.checkTrueOrderQuestion) {
      this.openCheckQAContentNextQuestModal();
    } else {
      if (!this.state.checkValidateNextRight) {
        if (
          parseInt(this.state.ExcerciseNthQuestion) + 1 + "" ===
          this.props.ExcerciseNumberQuestion
        ) {
          this.setState({
            checkValidateNextRight: true
          });
        }

        let nthindex = this.state.ExcerciseAllQAContent.findIndex(nthitem => {
          return (
            nthitem.ExcerciseNthQuestion ===
            parseInt(this.state.ExcerciseNthQuestion) + 1 + ""
          );
        });

        if (nthindex >= 0) {
          this.setState({
            ExcerciseNthQuestion:
              parseInt(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false,
            checkTrueOrderQuestion: true
          });
        } else {
          this.setState({
            ExcerciseNthQuestion:
              parseInt(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false,
            checkTrueOrderQuestion: false
          });
        }
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  prevToNthQuestionOnLeft = () => {
    if (!this.state.checkValidatePrevLeft) {
      if (parseInt(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
        this.setState({
          checkValidatePrevLeft: true
        });
      }

      this.setState({
        ExcerciseNthQuestion:
          parseInt(this.state.ExcerciseNthQuestion) - 1 + "",
        checkValidateNextRight: false,
        checkTrueOrderQuestion: true
      });
    } else {
      this.openOverNumberQuestionModal();
    }
  };

  getAllQAContentToExcerciseContent = (
    excerciseNthQuestion,
    excerciseQuestionContent,
    excerciseAnswerContentA,
    excerciseAnswerContentB,
    excerciseAnswerContentC,
    excerciseAnswerContentD,
    excerciseCorrectAnswer
  ) => {
    let QAContent = {
      ExcerciseNthQuestion: excerciseNthQuestion,
      ExcerciseQuestionContent: excerciseQuestionContent,
      ExcerciseAnswerContentA: excerciseAnswerContentA,
      ExcerciseAnswerContentB: excerciseAnswerContentB,
      ExcerciseAnswerContentC: excerciseAnswerContentC,
      ExcerciseAnswerContentD: excerciseAnswerContentD,
      ExcerciseCorrectAnswer: excerciseCorrectAnswer
    };
    let nthindex = this.state.ExcerciseAllQAContent.findIndex(questitem => {
      return questitem.ExcerciseNthQuestion === excerciseNthQuestion;
    });
    if (nthindex >= 0) {
      this.state.ExcerciseAllQAContent.splice(nthindex, 1, QAContent);
      this.setState({
        ExcerciseAllQAContent: this.state.ExcerciseAllQAContent
      });
    } else {
      this.setState({
        ExcerciseAllQAContent: [...this.state.ExcerciseAllQAContent, QAContent],
        checkTrueOrderQuestion: true
      });
    }
  };

  sendAllQAndAExcerciseContent = () => {
    axios
      .post("/createnewexcerciseallQAcontent", {
        MemberID: this.props.MemberID,
        ExcerciseAllQAContent: this.state.ExcerciseAllQAContent,
        ExcerciseName: this.props.ExcerciseName,
        ExcerciseDescription: this.props.ExcerciseDescription,
        ExcerciseLogo: this.props.ExcerciseLogo,
        ExcerciseCreateMemberID: this.props.MemberID,
        ExcerciseType: this.props.ExcerciseType,
        ExcerciseNumberQuestion: this.props.ExcerciseNumberQuestion
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-create-excercise-QA-content") {
          this.timeout = setTimeout(() => {
            this.props.updateRenderExcerciseControl("excerciseall");
          }, 200);
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

  sendToCompleteExcercises = () => {
    if (
      this.state.ExcerciseAllQAContent.length !==
      Number(this.props.ExcerciseNumberQuestion)
    ) {
      this.openCheckCompleteExcerciseModal();
    } else {
      this.openCheckCompleteAllExcerciseAllQAContentIsOpenModal();
    }
  };

  excerciseQAndAControl = () => {
    return (
      <div className="user-excercises_create-new__QandA___control">
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
            value="Ho??n t???t"
            onClick={() => this.sendToCompleteExcercises()}
          />
        </div>
      </div>
    );
  };

  renderExcercisesQAndAContentItem = () => {
    let nthindex = this.state.ExcerciseAllQAContent.findIndex(questitem => {
      return questitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion;
    });

    if (nthindex >= 0) {
      return (
        <ExcercisesCreateQAndAContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllQAContentToExcerciseContent={
            this.getAllQAContentToExcerciseContent
          }
          ExcerciseQuestionContent={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseCorrectAnswer={
            this.state.ExcerciseAllQAContent[nthindex].ExcerciseCorrectAnswer
          }
        />
      );
    } else {
      return (
        <ExcercisesCreateQAndAContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllQAContentToExcerciseContent={
            this.getAllQAContentToExcerciseContent
          }
          ExcerciseQuestionContent=""
          ExcerciseAnswerContentA=""
          ExcerciseAnswerContentB=""
          ExcerciseAnswerContentC=""
          ExcerciseAnswerContentD=""
          ExcerciseCorrectAnswer=""
        />
      );
    }
  };

  createNewExcerciseAllQAContent = () => {
    return (
      <div className="user-excercises_create-new__QandA">
        <ExcercisesCreateQAndAMainInfor
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderExcerciseControl={this.props.updateRenderExcerciseControl}
          updateRenderExcerciseCreateNewControl={
            this.props.updateRenderExcerciseCreateNewControl
          }
          ExcerciseName={this.props.ExcerciseName}
          ExcerciseNumberQuestion={this.props.ExcerciseNumberQuestion}
          ExcerciseType={this.props.ExcerciseType}
          ExcerciseLogo={this.props.ExcerciseLogo}
        />

        {this.renderExcercisesQAndAContentItem()}
        {this.excerciseQAndAControl()}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.createNewExcerciseAllQAContent()}

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
          isOpen={this.state.overNumberQuestionIsOpen}
          onRequestClose={this.closeOverNumberQuestionModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???c NH???</p>
            <p style={{ fontWeight: "bold" }}>
              Kh??ng th??? v?????t qu?? s??? l?????ng c??u h???i c???a B??? ????? - B??i t???p !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeOverNumberQuestionModal()}
          >
            ???? hi???u!!!
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
          isOpen={this.state.checkQAContentNextQuestIsOpen}
          onRequestClose={this.closeCheckQAContentNextQuestModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???c NH???</p>
            <p style={{ fontWeight: "bold" }}>
              B???n ph???i nh???p ?????y ????? n???i dung c???a C??u h???i s??? &nbsp;
              {this.state.ExcerciseNthQuestion} n??y ???? !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckQAContentNextQuestModal()}
          >
            ???? hi???u!!!
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
          isOpen={this.state.checkCompleteExcerciseIsOpen}
          onRequestClose={this.closeCheckCompleteExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???c NH???</p>
            <p style={{ fontWeight: "bold" }}>
              B???n ch??a ho??n th??nh n???i dung cho t???t c??? c??c c??u h???i c?? trong B??? ?????
              - B??i t???p !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCompleteExcerciseModal()}
          >
            ???? hi???u!!!
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
          isOpen={this.state.checkCompleteAllExcerciseAllQAContentIsOpen}
          onRequestClose={
            this.closeCheckCompleteAllExcerciseAllQAContentIsOpenModal
          }
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              X??c nh???n ho??n t???t qu?? tr??nh t???o n???i dung cho B??? ????? - B??i t???p ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() =>
              this.closeCheckCompleteAllExcerciseAllQAContentIsOpenModal()
            }
          >
            Xem l???i
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendAllQAndAExcerciseContent()}
          >
            X??c nh???n
          </button>
        </Modal>
      </div>
    );
  }
}
