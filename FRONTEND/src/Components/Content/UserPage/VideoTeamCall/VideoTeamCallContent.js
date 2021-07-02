import React, { Component } from "react";
// import Draggable from "react-draggable";

import Videos from "./Videos";
import Video from "./Video";

export default class VideoTeamCallContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,

      remoteStreams: [],
      peerConnections: {},
      selectedVideo: null,

      // status: "Please wait...",

      pc_config: {
        iceServers: [
          { urls: "stun:stun01.sipphone.com" },
          { urls: "stun:stun.ekiga.net" },
          { urls: "stun:stun.fwdnet.net" },
          { urls: "stun:stun.ideasip.com" },
          { urls: "stun:stun.iptel.org" },
          { urls: "stun:stun.rixtelecom.se" },
          { urls: "stun:stun.schlund.de" },
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
          { urls: "stun:stunserver.org" },
          { urls: "stun:stun.softjoys.com" },
          { urls: "stun:stun.voiparound.com" },
          { urls: "stun:stun.voipbuster.com" },
          { urls: "stun:stun.voipstunt.com" },
          { urls: "stun:stun.voxgratia.org" },
          { urls: "stun:stun.xten.com" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: ["turn:13.250.13.83:3478?transport=udp"],
            username: "YzYNCouZM1mhqhmseWk6",
            credential: "YzYNCouZM1mhqhmseWk6"
          },
          {
            urls: "turn:turn.bistri.com:80",
            credential: "homeo",
            username: "homeo"
          },
          {
            urls: "turn:turn.anyfirewall.com:443?transport=tcp",
            credential: "webrtc",
            username: "webrtc"
          }
        ]
      },

      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        }
      }
    };
  }

  componentDidMount = () => {
    if (this.props.socket) {
      this.connectCallSuccess();
      this.peerMemberCallDisconnect();
      this.connectAllMemberCall();
      this.offerForConnectTeamCall();
      this.answerForConnectTeamCall();
      this.getCandidateForConnect();
      this.reconnectWhenHaveErrorConnect();
      this.removeErrorPeerConnection();
    }
  };

  //==================================confirmEstablishConnectCallSucess======================================================

  connectCallSuccess = () => {
    this.props.socket.on("connection-call-success", data => {
      console.log("Đã kết nối !!!!  ", data);

      if (
        data.MemberID === this.props.MemberID &&
        data.TeamID === this.props.TeamID
      ) {
        this.getLocalStream();
      }
    });
  };

  //==================================getLocalStreamAndStartCameraAndMic======================================================

  getLocalStream = () => {
    const success = stream => {
      window.localStream = stream;
      this.setState({
        localStream: stream
      });

      this.props.socket.emit("online-call-peer-members", {
        TeamID: this.props.TeamID,
        LocalMemberID: this.props.MemberID,
        LocalMemberSocketID: this.props.socket.id
      });
    };

    const failure = e => {
      console.log("getUserMedia Error: ", e);
    };

    const constraints = {
      video: true,
      audio: { echoCancellation: true },
      options: {
        mirror: true
      }
    };

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      success(stream);
    })().catch(failure);
  };

  //==================================DisconnectedPeerMemberCall======================================================

  peerMemberCallDisconnect = () => {
    this.props.socket.on("peer-member-call-disconnected", data => {
      this.state.peerConnections[data.RemoteMemberID].close();

      const rVideo = this.state.remoteStreams.filter(
        stream => stream.id === data.RemoteMemberID
      );
      rVideo && this.stopTracks(rVideo[0].stream);

      const remoteStreams = this.state.remoteStreams.filter(
        stream => stream.id !== data.RemoteMemberID
      );

      this.setState(prevState => {
        const selectedVideo =
          prevState.selectedVideo.id === data.RemoteMemberID &&
          remoteStreams.length
            ? { selectedVideo: remoteStreams[0] }
            : null;

        return {
          remoteStreams,
          ...selectedVideo
        };
      });
    });
  };

  //==================================ConnectAllMemberCall======================================================

  connectAllMemberCall = () => {
    this.props.socket.on("connect-all-member-call", data => {
      // console.log("Nhận kết nối từ thằng ", data.RemoteMemberID);
      this.createPeerConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        pc => {
          if (pc) {
            pc.createOffer(this.state.sdpConstraints).then(sdp => {
              pc.setLocalDescription(sdp);

              this.props.socket.emit("offer-to-connect-team-call", {
                SDPOfferConnect: sdp,
                LocalMemberID: this.props.MemberID,
                LocalMemberSocketID: this.props.socket.id,
                RemoteMemberID: data.RemoteMemberID,
                RemoteMemberSocketID: data.RemoteMemberSocketID
              });
            });
          }
        }
      );
    });
  };

  //==================================createPeerConnectionForMember======================================================

  createPeerConnection = (RemoteMemberID, RemoteMemberSocketID, callback) => {
    try {
      let pc = new RTCPeerConnection(this.state.pc_config);

      const peerConnections = {
        ...this.state.peerConnections,
        [RemoteMemberID]: pc
      };
      this.setState({
        peerConnections
      });

      pc.onicecandidate = e => {
        if (e.candidate) {
          this.props.socket.emit("set-candidate-to-connect", {
            CandidateConnect: e.candidate,
            LocalMemberID: this.props.MemberID,
            LocalMemberSocketID: this.props.socket.id,
            RemoteMemberID: RemoteMemberID,
            RemoteMemberSocketID: RemoteMemberSocketID
          });
        }
      };

      pc.ontrack = e => {
        let _remoteStream = null;
        let remoteStreams = this.state.remoteStreams;
        let remoteVideo = {};

        const rVideos = this.state.remoteStreams.filter(
          stream => stream.id === RemoteMemberID
        );

        if (rVideos.length) {
          _remoteStream = rVideos[0].stream;
          _remoteStream.addTrack(e.track, _remoteStream);
          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream
          };
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return (
              (_remoteVideo.id === remoteVideo.id && remoteVideo) ||
              _remoteVideo
            );
          });
        } else {
          _remoteStream = new MediaStream();
          _remoteStream.addTrack(e.track, _remoteStream);

          remoteVideo = {
            id: RemoteMemberID,
            name: RemoteMemberID,
            stream: _remoteStream
          };

          remoteStreams = [...this.state.remoteStreams, remoteVideo];
        }

        this.setState(prevState => {
          const remoteStream =
            prevState.remoteStreams.length > 0
              ? {}
              : { remoteStream: _remoteStream };

          let selectedVideo = prevState.remoteStreams.filter(
            stream => stream.id === prevState.selectedVideo.id
          );
          selectedVideo = selectedVideo.length
            ? {}
            : { selectedVideo: remoteVideo };

          return {
            ...selectedVideo,
            ...remoteStream,
            remoteStreams
            // remoteStreams: [...prevState.remoteStreams, remoteVideo]
          };
        });
      };

      pc.close = () => {};

      if (this.state.localStream) {
        this.state.localStream.getTracks().forEach(track => {
          pc.addTrack(track, this.state.localStream);
        });
      }

      callback(pc);
    } catch (e) {
      console.log("Something went wrong! pc not created!!", e);
      callback(null);
    }
  };

  //==================================offerForConnectTeamCall======================================================

  offerForConnectTeamCall = () => {
    this.props.socket.on("offer-for-connect-team-call", data => {
      // console.log(
      //   "Ra offer-for-connect-team-call từ thằng ",
      //   data.RemoteMemberID
      // );
      this.createPeerConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        pc => {
          if (pc) {
            pc.addStream(this.state.localStream);
            pc.setRemoteDescription(data.SDPOfferConnect).then(() => {
              pc.createAnswer(this.state.sdpConstraints)
                .then(sdp => {
                  pc.setLocalDescription(sdp);

                  this.props.socket.emit("answer-to-connect-team-call", {
                    SDPAnswerConnect: sdp,
                    LocalMemberID: this.props.MemberID,
                    LocalMemberSocketID: this.props.socket.id,
                    RemoteMemberID: data.RemoteMemberID,
                    RemoteMemberSocketID: data.RemoteMemberSocketID
                  });
                })
                .catch(error => console.log(error));
            });
          }
        }
      );
    });
  };

  //==================================answerForConnectTeamCall======================================================

  answerForConnectTeamCall = () => {
    this.props.socket.on("answer-for-connect-team-call", data => {
      // console.log(
      //   "Ra answer-for-connect-team-call từ thằng ",
      //   data.RemoteMemberID
      // );
      const pc = this.state.peerConnections[data.RemoteMemberID];
      if (pc) {
        pc.setRemoteDescription(data.SDPAnswerConnect).catch(error => {
          console.log(error);
          // this.props.socket.emit("send-to-reconnect-again", {
          //   TeamID: this.props.TeamID,
          //   ErrorType: "answer",
          //   LocalMemberID: this.props.MemberID,
          //   LocalMemberSocketID: this.props.socket.id,
          //   RemoteMemberID: data.RemoteMemberID,
          //   RemoteMemberSocketID: data.RemoteMemberSocketID
          // });
        });
      }
    });
  };

  //==================================getCandidateForConnect======================================================

  getCandidateForConnect = () => {
    this.props.socket.on("get-candidate-for-connect", data => {
      // console.log(
      //   "Ra get-candidate-for-connect từ thằng ",
      //   data.RemoteMemberID
      // );
      const pc = this.state.peerConnections[data.RemoteMemberID];

      if (pc) {
        pc.addIceCandidate(data.CandidateConnect).catch(error => {
          console.log(error);
          // this.props.socket.emit("send-to-reconnect-again", {
          //   TeamID: this.props.TeamID,
          //   ErrorType: "candidate",
          //   LocalMemberID: this.props.MemberID,
          //   LocalMemberSocketID: this.props.socket.id,
          //   RemoteMemberID: data.RemoteMemberID,
          //   RemoteMemberSocketID: data.RemoteMemberSocketID
          // });
        });
      }
    });
  };

  //==================================reconnectWhenHaveErrorConnect======================================================

  reconnectWhenHaveErrorConnect = () => {
    this.props.socket.on("reconnect-to-call-when-error", data => {
      console.log("Có vẻ như lại bị lỗi từ thằng ", data.RemoteMemberID);
      const remoteStreams = this.state.remoteStreams.filter(
        stream => stream.id !== data.RemoteMemberID
      );

      if (this.state.selectedVideo.id) {
        this.setState(prevState => {
          const selectedVideo =
            prevState.selectedVideo.id === data.RemoteMemberID &&
            remoteStreams.length
              ? { selectedVideo: remoteStreams[0] }
              : null;

          return {
            remoteStreams,
            ...selectedVideo
          };
        });
      }

      this.props.socket.emit("reconnect-call-peer-members", {
        TeamID: this.props.TeamID,
        LocalMemberID: this.props.MemberID,
        LocalMemberSocketID: this.props.socket.id,
        RemoteMemberID: data.RemoteMemberID,
        RemoteMemberSocketID: data.RemoteMemberSocketID
      });
    });
  };

  //==================================removeErrorPeerConnection======================================================

  removeErrorPeerConnection = () => {
    this.props.socket.on("remove-error-peer-connection", data => {
      console.log("bắt vào đây rồi ");
      const peerconnection = Object.assign({}, this.state.peerConnections);
      delete peerconnection[data.RemoteMemberID];
      this.setState({
        peerConnections: peerconnection
      });

      // this.props.socket.emit("reconnect-error-peer-connection", {
      //   TeamID: this.props.TeamID,
      //   LocalMemberID: this.props.MemberID,
      //   LocalMemberSocketID: this.props.socket.id,
      //   RemoteMemberID: data.RemoteMemberID,
      //   RemoteMemberSocketID: data.RemoteMemberSocketID
      // });
    });
  };

  //==================================switchVideoRemoteOtherMemberCall======================================================

  switchVideo = _video => {
    this.setState({
      selectedVideo: _video
    });
  };

  //==================================stopTracks======================================================

  stopTracks = stream => {
    stream.getTracks().forEach(track => track.stop());
  };

  //==================================renderAllVideoCallOfMemberAndOthers======================================================

  render() {
    // console.log("xem peerConnections có gì: ", this.state.peerConnections);
    if (this.state.disconnected) {
      this.props.socket.close();

      this.stopTracks(this.state.localStream);

      this.state.remoteStreams.forEach(rVideo =>
        this.stopTracks(rVideo.stream)
      );

      this.state.peerConnections &&
        Object.values(this.state.peerConnections).forEach(pc => pc.close());

      return (
        <div style={{ fontWeight: "bold" }}>
          Bạn đã kết thúc cuộc gọi video call !!!!!
        </div>
      );
    }

    // const statusText = (
    //   <div style={{ color: "yellow", padding: 5 }}>{this.state.status}</div>
    // );

    return (
      <div>
        {/* <Draggable
          bounds={{
            top: -300,
            left: 300,
            right: 600,
            bottom: 300
          }}
        > */}
          <Video
            videoStyle={{
              // zIndex: 2,
              // position: "absolute",
              // right: 0,
              width: 200,
              cursor: "move"
              // height: 200,
              // margin: 5,
              // backgroundColor: "black"
            }}
            frameStyle={{
              width: 200,
              margin: 5,
              borderRadius: 5,
              backgroundColor: "black"
            }}
            showMuteControls={true}
            videoStream={this.state.localStream}
            autoPlay
            muted
          />
        {/* </Draggable> */}

        <Video
          videoStyle={{
            // zIndex: 1,
            // position: "fixed",
            bottom: 0,
            minWidth: "100%",
            // minHeight: "100%",
            height: "320px",
            backgroundColor: "black"
          }}
          videoStream={
            this.state.selectedVideo && this.state.selectedVideo.stream
          }
          autoPlay
        ></Video>

        <br />

        <div
          style={{
            zIndex: 3,
            position: "absolute"
            // margin: 10,
            // backgroundColor: "#cdc4ff4f",
            // padding: 10,
            // borderRadius: 5
          }}
        >
          {/* <div>
            <i
              onClick={() => {
                this.setState({ disconnected: true });
              }}
              style={{ cursor: "pointer", paddingLeft: 15, color: "red" }}
              className="material-icons"
            >
              {"call_end"}
            </i>
          </div> */}
          {/* <div
            style={{
              margin: 10,
              backgroundColor: "#cdc4ff4f",
              padding: 10,
              borderRadius: 5
            }}
          >
            {statusText}
          </div> */}
        </div>
        <div>
          <Videos
            switchVideo={this.switchVideo}
            remoteStreams={this.state.remoteStreams}
          ></Videos>
        </div>
        <br />
      </div>
    );
  }
}
