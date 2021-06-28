import React from "react";
import axios from "axios";

import AssignmentsUnfinishedItem from "./AssignmentsUnfinishedItem";

export default class AssignmentsAllUnfinishedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReminderChoiceID: "",
      AllAssignmentUnfinishedList: []
    };
  }

  componentDidMount = () => {
    axios
      .post("/getassignmentunfinishedlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        console.log("bắn về thằng getassginmentunfinishedlist", res.data);
        this.setState({
          AllAssignmentUnfinishedList: res.data.AllAssignmentUnfinishedList
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.semounted = true;
    this.mounted = true;

    this.props.socket.on("send-to-update-assignment-unfinished-list", data => {
      if (this.semounted) {
        if (data.MemberID === this.props.MemberID) {
          this.props.socket.emit(
            "receive-to-update-assignment-unfinished-list",
            {
              MemberID: this.props.MemberID
            }
          );
        }
      }
    });

    this.props.socket.on("update-assignment-unfinished-list", data => {
      if (this.mounted) {
        if (data.MemberID === this.props.MemberID) {
          this.setState({
            AllAssignmentUnfinishedList: data.AllAssignmentUnfinishedList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.semounted = false;
    this.mounted = false;
  };

  renderAllAssignmentUnfinishedList = () => {
    if (this.state.AllAssignmentUnfinishedList.length !== 0) {
      return (
        <div className="user-assignments_all__list___content_____unfinished______content">
          {this.state.AllAssignmentUnfinishedList.map(
            (assignmentitem, assignmentindex) => (
              <div key={assignmentindex}>
                <AssignmentsUnfinishedItem
                  AssignmentID={assignmentitem.AssignmentID}
                  TeamNoteName={assignmentitem.TeamNoteName}
                  TeamNoteCreateDate={assignmentitem.TeamNoteCreateDate}
                  TeamNoteEndDate={assignmentitem.TeamNoteEndDate}
                  TeamID={assignmentitem.TeamID}
                  TeamLogo={assignmentitem.TeamLogo}
                  ExcerciseID={assignmentitem.ExcerciseID}
                  CheckOverTimeToFinished={
                    assignmentitem.CheckOverTimeToFinished
                  }
                  MemberID={this.props.MemberID}
                  socket={this.props.socket}
                  updateRenderAssignmentsControl={
                    this.props.updateRenderAssignmentsControl
                  }
                  setChooseAssignmentAndExcerciseToDoExcericse={
                    this.props.setChooseAssignmentAndExcerciseToDoExcericse
                  }
                  setChooseAssignmentToTurnIn={
                    this.props.setChooseAssignmentToTurnIn
                  }
                  AssignmentChoiceID={this.props.AssignmentChoiceID}
                />
              </div>
            )
          )}
        </div>
      );
    } else {
      // setTimeout(() => {
      return (
        <div style={{ fontWeight: "bold" }}>
          <p>Chưa có Bài tập nào chưa hoàn thành giao cả !!!</p>
        </div>
      );
      // },1000);
    }
  };

  render() {
    return <div>{this.renderAllAssignmentUnfinishedList()}</div>;
  }
}
