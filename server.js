const http = require("http");
require("dotenv").config();

const serverHandler = require("./app");

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME;

const server = http.createServer(serverHandler);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening on port ${PORT}`);
});
