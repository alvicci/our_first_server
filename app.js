const {
  authenticateUser,
  createUser,
  getUsers,
} = require("./users.controller");

module.exports = function serverHandler(req, res) {
  const routing = req.url;
  if (routing === "/createuser" && req.method === "POST") {
    createUser(req, res);
  } else if (routing === "/authenticateuser" && req.method === "POST") {
    authenticateUser(req, res);
  } else if (routing === "/getusers" && req.method === "GET") {
    getUsers(req, res);
  } else {
    res.writeHead(404);
    res.end("Reconfirm the endpoint and reattempt!");
  }
};
