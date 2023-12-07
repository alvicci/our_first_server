const {
  authenticateUser,
  createUser,
  getUsers,
  authenticate,
} = require("./users.controller");

const { addBook } = require("./books.controller");

module.exports = function serverHandler(req, res) {
  const routing = req.url;
  if (routing === "/createuser" && req.method === "POST") {
    createUser(req, res);
  } else if (routing === "/authenticateuser" && req.method === "POST") {
    authenticateUser(req, res);
  } else if (routing === "/getusers" && req.method === "GET") {
    authenticate(req, res)
      .then(() => {
        getUsers(req, res);
      })
      .catch((err) => {
        res.writeHead(401);
        res.end(
          JSON.stringify({
            status: "failed",
            message: "Incorrect username and/or password! 🙄",
          })
        );
      });
  } else if (routing === "/book" && req.method === "POST") {
    addBook(req, res);
  } else if (routing === "/book" && req.method === "GET") {
    authenicate(req, res);
  } else {
    res.writeHead(404);
    res.end("Reconfirm the endpoint and reattempt!");
  }
};
