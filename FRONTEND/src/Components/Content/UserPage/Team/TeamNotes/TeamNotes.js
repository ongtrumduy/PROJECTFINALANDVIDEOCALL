import React from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";

import "./TeamNotes.css";
import TeamNotesContent from "./TeamNotesContent";
import TeamNotesCreateNewNote from "./TeamNotesCreateNewNote";

export default class TeamNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkCreateNewNoteIsOpen: false
    };
  }

  openCheckCreateNewNoteModal = () => {
    this.setState({ checkCreateNewNoteIsOpen: true });
  };

  closeCheckCreateNewNoteModal = () => {
    this.setState({ checkCreateNewNoteIsOpen: false });
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes">
        <TeamNotesContent
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
        />

        <Draggable bounds={{ top: -300, left: -600, right: 0, bottom: 0 }}>
          <div
            style={
              this.props.CheckMemberIsAdmin
                ? { display: "inline" }
                : { display: "none" }
            }
            className="user-team_team-menu-and-content__content___notes____create-new-button"
          >
            <i
              onClick={() => this.openCheckCreateNewNoteModal()}
              className="material-icons"
            >
              {"create"}
            </i>
          </div>
        </Draggable>

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "440px",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              border: "2px solid black",
              zIndex: "2000",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkCreateNewNoteIsOpen}
          onRequestClose={this.closeCheckCreateNewNoteModal}
        >
          <div>
            <TeamNotesCreateNewNote
              MemberID={this.props.MemberID}
              TeamID={this.props.TeamID}
              socket={this.props.socket}
              closeCheckCreateNewNoteModal={this.closeCheckCreateNewNoteModal}
            />
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCreateNewNoteModal()}
          >
            Đóng
          </button>
        </Modal>
      </div>
    );
  }
}
