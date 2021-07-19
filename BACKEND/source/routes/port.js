let PortRoutes = function(server, port) {
  server.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(
      `Server cua Ung dung Ho tro Tao nhóm, trao đoi, thao luan hoc tap và kien thuc đang chay trên cong ${port}`
    );
  });
};

module.exports = PortRoutes;
