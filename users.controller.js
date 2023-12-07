const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "db", "users.json");

const createUser = function (req, res) {
  const requestBody = [];
  req.on("data", (chunk) => {
    requestBody.push(chunk);
  });
  req.on("end", () => {
    const parsedBody = Buffer.concat(requestBody).toString();
    const newUser = JSON.parse(parsedBody);

    // Read from our local DB
    fs.readFile(usersFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(err.message);
        res.writeHead(500);
        res.end("A terrible incident occured. It's your fault!");
        return;
      }
      const existUsers = JSON.parse(data);
      const allUsers = [...existUsers, newUser];

      fs.writeFile(usersFilePath, JSON.stringify(allUsers), "utf8", (err) => {
        if (err) {
          console.log(err.message);
          res.writeHead(500);
          res.end("Another terrible incident occured. It's not our fault!");
          return;
        }
      });
      res.writeHead(201);
      res.end("User created successfully!");
    });
  });
};

const authenticateUser = function (req, res) {
  let body = [];
  req.on("data", (ch) => {
    body.push(ch);
  });
  req.on("end", () => {
    const parsedLoginDetails = JSON.parse(Buffer.concat(body).toString());

    fs.readFile(usersFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(err.message);
        res.writeHead(500);
        res.end("A terrible incident occured. It's your fault!");
        return;
      }
      const allUsers = JSON.parse(data);
      const { username, password } = parsedLoginDetails;
      const existingUserIndex = allUsers.findIndex(
        (user) => user.username === username && user.password === password
      );
      if (existingUserIndex === -1) {
        res.writeHead(401);
        res.end("Username or password is incorrect. Reconfirm details!");
        return;
      }
      res.writeHead(200);
      res.end("Login successful!");
    });
  });
};

const getUsers = function (req, res) {
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      res.writeHead(500);
      res.end("A terrible incident occured. It's your fault!");
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
};

module.exports = { authenticateUser, createUser, getUsers };
