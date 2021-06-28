import React from "react";
import axios from "axios";

import AssignmentsFinishedItem from "./AssignmentsFinishedItem";

export default class AssignmentsAllUnfinishedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReminderChoiceID: "",
      AllAssignmentFinishedList: []
    };
  }

  componentDidMount = () => {
    axios
      .post("/getassignmentfinishedlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        console.log("bắn về thằng getassginmentfinishedlist", res.data);
        this.setState({
          AllAssignmentFinishedList: res.data.AllAssignmentFinishedList
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
          this.props.socket.emit("receive-to-update-assignment-unfinished-list", {
            MemberID: this.props.MemberID
          });
        }
      }
    });

    this.props.socket.on("update-assignment-finished-list", data => {
      if (this.mounted) {
        if (data.MemberID === this.props.MemberID) {
          this.setState({
            AllAssignmentFinishedList: data.AllAssignmentFinishedList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.semounted = false;
    this.mounted = false;
  };

  setChooseAssignmentToChangeIcon = assigmentChoiceID => {
    this.setState({
      AssigmentChoiceID: assigmentChoiceID
    });
  };

  renderAllAssignmentFinishedList = () => {
    if (this.state.AllAssignmentFinishedList.length !== 0) {
      return (
        <div className="user-assignments_all__list___content_____finished______content">
          {this.state.AllAssignmentFinishedList.map(
            (assignmentitem, assignmentindex) => (
              <div key={assignmentindex}>
                <AssignmentsFinishedItem
                  AssignmentID={assignmentitem.AssignmentID}
                  TeamNoteName={assignmentitem.TeamNoteName}
                  TeamNoteCreateDate={assignmentitem.TeamNoteCreateDate}
                  TeamNoteEndDate={assignmentitem.TeamNoteEndDate}
                  TeamID={assignmentitem.TeamID}
                  TeamLogo={assignmentitem.TeamLogo}
                  ExcerciseID={assignmentitem.ExcerciseID}
                  AssignmentExcerciseScore={
                    assignmentitem.AssignmentExcerciseScore
                  }
                  CheckTurnInFinishedLate={
                    assignmentitem.CheckTurnInFinishedLate
                  }
                  MemberID={this.props.MemberID}
                  socket={this.props.socket}
                  updateRenderAssignmentsControl={
                    this.props.updateRenderAssignmentsControl
                  }
                  setChooseAssignmentAndExcerciseToDoExcericse={
                    this.props.setChooseAssignmentAndExcerciseToDoExcericse
                  }
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
          <p>Chưa có Bài tập nào hoàn thành giao cả !!!</p>
        </div>
      );
      // },1000);
    }
  };

  render() {
    return <div>{this.renderAllAssignmentFinishedList()}</div>;
  }
}
