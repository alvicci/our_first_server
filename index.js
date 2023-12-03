const http = require("http");
const path = require("path");
const fs = require("fs");

const usersFilePath = path.join(__dirname, "db", "users.json");
console.log(usersFilePath);

const PORT = 3000;
const HOSTNAME = "127.0.0.1";

function serverHandler(req, res) {
  const routing = req.url;
  if (routing === "/createuser" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const convertedBody = Buffer.concat(body).toString();
      const jsonbody = JSON.parse(convertedBody);
      fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
        const jsonData = JSON.parse(data);
        jsonData[jsonbody.email] = jsonbody;
        console.log(jsonData);
        fs.writeFile(usersFilePath, JSON.stringify(jsonData), (err, data) => {
          if (err) {
            console.log(err.message);
          }
          res.end(JSON.stringify(jsonData));
        });
        res.end("User created successfully");
      });
      console.log(`My name is ${jsonbody.full_name}`);
    });
    res.writeHead(201);
    res.end("User created successfully");
  } else if (routing === "/authenticateuser" && req.method === "POST") {
    res.writeHead(200);
    res.write("User has been authenticated successfully");
  } else if (routing === "/getusers" && req.method === "GET") {
    res.writeHead(200);
    res.write("Fetch all users!!!");
  } else {
    res.writeHead(404);
    res.end("Reconfirm the route location!");
  }
  res.end();
}

const server = http.createServer(serverHandler);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening on port ${PORT}`);
});
