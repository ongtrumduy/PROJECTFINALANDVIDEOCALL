import React from "react";
import Modal from "react-modal";

export default class TeamSettingTeamName extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      TeamName: "",
      TeamDescription: "",
      TeamType: "",
      openEditTeamName: false,
      openEditTeamDescription: false,
      openEditTeamType: false,
      checkChangeToEditTeamNameIsOpen: false,
      checkChangeToEditTeamDescriptionIsOpen: false,
      checkChangeToEditTeamTypeIsOpen: false,
      checkNonTeamNameToChangeIsOpen: false
    };
  }

  openCheckChangeToEditTeamNameModal = () => {
    this.setState({
      checkChangeToEditTeamNameIsOpen: true
    });
  };

  openCheckChangeToEditTeamDescriptionModal = () => {
    this.setState({
      checkChangeToEditTeamDescriptionIsOpen: true
    });
  };

  openCheckChangeToEditTeamTypeModal = () => {
    this.setState({
      checkChangeToEditTeamTypeIsOpen: true
    });
  };

  closeCheckChangeToEditTeamNameModal = () => {
    this.setState({
      checkChangeToEditTeamNameIsOpen: false
    });
  };

  closeCheckChangeToEditTeamDescriptionModal = () => {
    this.setState({
      checkChangeToEditTeamDescriptionIsOpen: false
    });
  };

  closeCheckChangeToEditTeamTypeModal = () => {
    this.setState({
      checkChangeToEditTeamTypeIsOpen: false
    });
  };

  openCheckNonTeamNameToChangeModal = () => {
    this.setState({
      checkNonTeamNameToChangeIsOpen: true
    });
  };

  closeCheckNonTeamNameToChangeModal = () => {
    this.setState({
      checkNonTeamNameToChangeIsOpen: false
    });
  };

  changeToEditTeamName = () => {
    this.setState({
      openEditTeamName: true,
      checkChangeToEditTeamNameIsOpen: false
    });
  };

  changeToEditTeamDescription = () => {
    this.setState({
      openEditTeamDescription: true,
      checkChangeToEditTeamDescriptionIsOpen: false
    });
  };

  changeToEditTeamType = () => {
    this.setState({
      openEditTeamType: true,
      checkChangeToEditTeamTypeIsOpen: false
    });
  };

  handleValueOfTeamInfor = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  sendToEditTeamName = () => {
    if (Object.keys(this.state.TeamName).length === 0) {
      this.openCheckNonTeamNameToChangeModal();
    } else {
      this.setState({
        openEditTeamName: false
      });

      this.props.socket.emit("send-to-edit-team-name", {
        TeamID: this.props.TeamID,
        TeamName: this.state.TeamName
      });
    }
  };

  sendToEditTeamDescription = () => {
    this.setState({
      openEditTeamDescription: false
    });

    this.props.socket.emit("send-to-edit-team-description", {
      TeamID: this.props.TeamID,
      TeamDescription: this.state.TeamDescription
    });
  };

  sendToEditTeamType = () => {
    this.setState({
      openEditTeamType: false
    });

    this.props.socket.emit("send-to-edit-team-type", {
      TeamID: this.props.TeamID,
      TeamType: this.state.TeamType
    });
  };

  componentDidMount = () => {
    this.mounted = true;

    this.props.ChooseTeamInfor.map(teaminforitem => {
      if (this.mounted) {
        return this.setState({
          TeamName: teaminforitem.TeamName,
          TeamDescription: teaminforitem.TeamDescription,
          TeamType: teaminforitem.TeamType
        });
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___settings____team-name">
        {this.props.ChooseTeamInfor.map((teaminforitem, teaminforindex) => {
          return (
            <div key={teaminforindex}>
              <span
                style={{
                  fontWeight: "bold",
                  userSelect: "none"
                }}
              >
                Tên nhóm:
              </span>
              <br></br>
              <div>
                <div style={{ width: "88%", height: "44px" }}>
                  {this.state.openEditTeamName === false ? (
                    <span>{teaminforitem.TeamName}</span>
                  ) : (
                    <textarea
                      value={this.state.TeamName}
                      name="TeamName"
                      maxLength="120"
                      onChange={event => this.handleValueOfTeamInfor(event)}
                    ></textarea>
                  )}
                </div>

                <div className="user-team_team-menu-and-content__content___settings____team-name_____edit-or-update">
                  {this.state.openEditTeamName === false ? (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() => this.openCheckChangeToEditTeamNameModal()}
                    >
                      <i className="material-icons">{"edit"}</i>
                    </div>
                  ) : (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() => this.sendToEditTeamName()}
                    >
                      <i
                        style={{ fontWeight: "bold" }}
                        className="material-icons"
                      >
                        {"done_all"}
                      </i>
                    </div>
                  )}
                </div>
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  userSelect: "none"
                }}
              >
                Mô tả:
              </span>
              <br></br>
              <div>
                <div style={{ width: "88%", height: "44px" }}>
                  {this.state.openEditTeamDescription === false ? (
                    <span>{teaminforitem.TeamDescription}</span>
                  ) : (
                    <textarea
                      value={this.state.TeamDescription}
                      name="TeamDescription"
                      maxLength="120"
                      onChange={event => this.handleValueOfTeamInfor(event)}
                    ></textarea>
                  )}
                </div>

                <div className="user-team_team-menu-and-content__content___settings____team-name_____edit-or-update">
                  {this.state.openEditTeamDescription === false ? (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() =>
                        this.openCheckChangeToEditTeamDescriptionModal()
                      }
                    >
                      <i className="material-icons">{"edit"}</i>
                    </div>
                  ) : (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() => this.sendToEditTeamDescription()}
                    >
                      <i
                        style={{ fontWeight: "bold" }}
                        className="material-icons"
                      >
                        {"done_all"}
                      </i>
                    </div>
                  )}
                </div>
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  userSelect: "none"
                }}
              >
                Loại nhóm:
              </span>
              <br></br>
              <div>
                <div style={{ width: "88%", height: "44px" }}>
                  {this.state.openEditTeamType === false ? (
                    <span>
                      {teaminforitem.TeamType === "public"
                        ? "Công khai"
                        : "Riêng tư"}
                    </span>
                  ) : (
                    <div className="user-team_team-menu-and-content__content___settings____team-name_____choice-team-type">
                      <div>
                        <input
                          type="radio"
                          name="TeamType"
                          value="public"
                          checked={this.state.TeamType === "public"}
                          onChange={event => this.handleValueOfTeamInfor(event)}
                        />
                      </div>
                      <span>Công khai</span>

                      <div>
                        <input
                          type="radio"
                          name="TeamType"
                          value="private"
                          checked={this.state.TeamType === "private"}
                          onChange={event => this.handleValueOfTeamInfor(event)}
                        />
                      </div>
                      <span>Riêng tư</span>
                    </div>
                  )}
                </div>

                <div className="user-team_team-menu-and-content__content___settings____team-name_____edit-or-update">
                  {this.state.openEditTeamType === false ? (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() => this.openCheckChangeToEditTeamTypeModal()}
                    >
                      <i className="material-icons">{"edit"}</i>
                    </div>
                  ) : (
                    <div
                      style={
                        this.props.CheckMemberIsAdmin
                          ? { display: "inline" }
                          : { display: "none" }
                      }
                      onClick={() => this.sendToEditTeamType()}
                    >
                      <i
                        style={{ fontWeight: "bold" }}
                        className="material-icons"
                      >
                        {"done_all"}
                      </i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/*============================================================================================================================================================ */}

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
          isOpen={this.state.checkChangeToEditTeamNameIsOpen}
          onRequestClose={this.closeCheckChangeToEditTeamNameModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có thực sự muốn sửa Tên của nhóm không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.changeToEditTeamName()}
          >
            Chuẩn rồi!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckChangeToEditTeamNameModal()}
          >
            Nghĩ lại!!!
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
          isOpen={this.state.checkChangeToEditTeamDescriptionIsOpen}
          onRequestClose={this.closeCheckChangeToEditTeamDescriptionModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có thực sự muốn sửa Mô tả của nhóm không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.changeToEditTeamDescription()}
          >
            Chuẩn rồi!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckChangeToEditTeamDescriptionModal()}
          >
            Nghĩ lại!!!
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
          isOpen={this.state.checkChangeToEditTeamTypeIsOpen}
          onRequestClose={this.closeCheckChangeToEditTeamTypeModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có thực sự muốn sửa Loại của nhóm không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.changeToEditTeamType()}
          >
            Chuẩn rồi!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckChangeToEditTeamTypeModal()}
          >
            Nghĩ lại!!!
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
          isOpen={this.state.checkNonTeamNameToChangeIsOpen}
          onRequestClose={this.closeCheckNonTeamNameToChangeModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không được để trống Tên nhóm !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckNonTeamNameToChangeModal()}
          >
            Đã rõ!!!
          </button>
        </Modal>
      </div>
    );
  }
}
