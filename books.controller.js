const fs = require("fs");
const path = require("path");
const booksFilePath = path.join(__dirname, "db", "books.json");

const addBook = function (req, res) {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    if (!parsedBook) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          status: "failed",
          message: "Bad request! Confirm details sent! 😣",
        })
      );
      return;
    }
    const newBook = JSON.parse(parsedBook);
    fs.readFile(booksFilePath, "utf8", (err, data) => {
      console.log("Here");
      if (err) {
        console.log(err.message);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "failed",
            message: "Don't worry! It's our fault, try again! 😢",
          })
        );
        return;
      }
      const oldBook = JSON.parse(data);
      const lastAddedBook = oldBook[oldBook.length - 1];
      const updateNewBookId = {
        ...newBook,
        loaned: false,
        loanCount: 0,
        returned: false,
        id: lastAddedBook.id + 1,
      };

      const allBooks = [...oldBook, updateNewBookId];

      fs.writeFile(booksFilePath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.log(err.message);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              status: "failed",
              message: "Don't worry! It's our fault, try again! 😢",
            })
          );
        }

        res.writeHead(201);
        res.end(
          JSON.stringify({
            status: "successful",
            message: updateNewBookId,
          })
        );
      });
    });
  });
};

module.exports = { addBook };
