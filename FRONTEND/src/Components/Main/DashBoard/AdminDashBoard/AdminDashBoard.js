import React from "react";
// import request from "request";

// import AdminHome from "../../Content/AdminHome/AdminHome";
// import UserTotal from "../../Content/UserTotal/UserTotal";
// import AdminStatistic from "../../Content/AdminStatistic/AdminStatistic";
// import AdminReport from "../../Content/AdminReport/AdminReport";
// import UnknowUserProfile from "../../Content/UnknowUserProfile/UnknowUserProfile";
// import SearchAdmin from "../../Content/SearchAdmin/SearchAdmin";
// import AdminSeeUserOnline from "../../Content/AdminSeeUserOnline/AdminSeeUserOnline";

// import "./AdminDashBoard.css";

export default class AdminDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content_state: 0
    };
  }

  // receiveFisrtName = callback => {
  //   var options = {
  //     method: "POST",
  //     url: "http://localhost:8081/userdashboard",
  //     headers: {
  //       "cache-control": "no-cache",
  //       Connection: "keep-alive",
  //       "Content-Length": "0",
  //       "Accept-Encoding": "gzip, deflate",
  //       Host: "localhost:8081",
  //       "Cache-Control": "no-cache",
  //       Accept: "*/*",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       check: "1"
  //     })
  //   };

  //   request(options, (error, response, body) => {
  //     if (error) throw new Error(error);
  //     // console.log(body)
  //     let receiveinfor = JSON.parse(body);
  //     callback(receiveinfor.id, receiveinfor.firstname);
  //   });
  // };

  // componentWillMount = () => {
  //   this.receiveFisrtName(this.callbackname);
  //   this.props.socket.on("add-friend-notify", data => {
  //     let friendrequest = data.lastname + " " + data.firstname;
  //     alert(`${friendrequest} đã gửi báo cáo cho bạn !!!!`);
  //   });
  // };

  // callbackname = (_userid, _firstname) => {
  //   this.setState({
  //     userid: _userid,
  //     firstname: _firstname
  //   });
  //   this.props.socket.emit("sent-user-id", _userid);
  //   this.props.socket.emit("send-friend-online", _userid);
  // };

  // updateContentState = state => {
  //   this.setState({ content_state: state });
  // };

  // renderContent = () => {
  //   switch (this.state.content_state) {
  //     case 1:
  //       return (
  //         <UserTotal userid={this.state.userid} socket={this.props.socket} />
  //       );
  //     case 2:
  //       return (
  //         <AdminStatistic
  //           userid={this.state.userid}
  //           socket={this.props.socket}
  //         />
  //       );
  //     case 3:
  //       return (
  //         <AdminReport userid={this.state.userid} socket={this.props.socket} />
  //       );
  //     case 4:
  //       return (
  //         <UnknowUserProfile
  //           userid={this.state.userid}
  //           friendid={this.state.friendid}
  //           socket={this.props.socket}
  //         />
  //       );
  //     default:
  //       return (
  //         <AdminHome userid={this.state.userid} socket={this.props.socket} />
  //       );
  //   }
  // };

  // searchSuccessAdmin = _friendid => {
  //   this.setState({
  //     content_state: 4,
  //     friendid: _friendid
  //   });
  // };

  // logoutAdmin = () => {
  //   let data = {
  //     notify: this.state.firstname + " đã đăng xuất",
  //     userid: this.state.userid
  //   };
  //   this.props.socket.emit("disconnect-logout", data);
  //   this.props.update_login();
  // };

  // adminDashBoard = () => {
  //   return (
  //     <div>
  //       <div className="admin-container">
  //         <div className="admin-content">
  //           <div className="admin-menu">
  //             <div className="admin-menu-logo">
  //               <div className="admin-menu-logo-heart-1">
  //                 <img alt="love" src={require("../../Image-Icon/Love.png")} />
  //               </div>
  //               <div className="admin-menu-logo-heart-2">
  //                 <img alt="love" src={require("../../Image-Icon/Love.png")} />
  //               </div>
  //             </div>

  //             <div className="admin-menu-search">
  //               <SearchAdmin
  //                 searchadmin={this.searchSuccessAdmin}
  //                 userid={this.state.userid}
  //               />
  //             </div>

  //             <div className="admin-menu-home">
  //               <button
  //                 onClick={() => {
  //                   this.updateContentState(0);
  //                 }}
  //               >
  //                 TRANG CHỦ
  //               </button>
  //             </div>

  //             <div className="admin-menu-friend">
  //               <button
  //                 onClick={() => {
  //                   this.updateContentState(1);
  //                 }}
  //               >
  //                 <img
  //                   alt="admins"
  //                   title="Tài khoản"
  //                   src={require("../../Image-Icon/User.png")}
  //                 />
  //                 {/* <span>0</span> */}
  //               </button>
  //             </div>

  //             <div className="admin-menu-message">
  //               <button
  //                 onClick={() => {
  //                   this.updateContentState(2);
  //                 }}
  //               >
  //                 <img
  //                   alt="message"
  //                   title="Thống kê"
  //                   src={require("../../Image-Icon/Chart Bar.png")}
  //                 />
  //                 {/* <span>0</span> */}
  //               </button>
  //             </div>

  //             <div className="admin-menu-notify">
  //               <button
  //                 onClick={() => {
  //                   this.updateContentState(3);
  //                 }}
  //               >
  //                 <img
  //                   alt="notify"
  //                   title="Báo cáo"
  //                   src={require("../../Image-Icon/Globe Inactive.png")}
  //                 />
  //                 {/* <span>0</span> */}
  //               </button>
  //             </div>

  //             <div className="admin-menu-logout">
  //               <button onClick={() => this.logoutAdmin()}>
  //                 <img
  //                   alt="love"
  //                   title="Đăng xuất"
  //                   src={require("../../Image-Icon/Button White Load.png")}
  //                 />
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="admin-body">
  //           <div className="admin-body-render">{this.renderContent()}</div>

  //           <div className="admin-body-online">
  //             <div className="admin-body-online-title">
  //               <div className="admin-body-online-title-icon"></div>
  //               <div className="admin-body-online-title-online">
  //                 <p>Online</p>
  //               </div>
  //             </div>

  //             <div className="admin-body-online-render">
  //               <AdminSeeUserOnline
  //                 userid={this.state.userid}
  //                 socket={this.props.socket}
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         <div className="admin-footer">
  //           <p>App giao lưu kết bạn và trò chuyện ver 2.0</p>
  //           <p>
  //             Design by Project 2 -{" "}
  //             <a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a> -
  //             Đại học Bách khoa Hà Nội
  //           </p>
  //           <p>
  //             Hanoi University of Science and Technology - No. 1, Dai Co Viet
  //             Str., Hanoi, Vietnam
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    // return <div>{this.adminDashBoard()}</div>;
    return <div>Hello</div>;
  }
}
