const express = require("express");
const server = express();
const PORT = 8080;

server.use(express.static("public"));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Welcome to the server");
  // return;
})

server.get("/sum", (req, res) => {
  const {a, b} = req.query;
  // console.log('test');
  if( isNaN(a) || isNaN(b)) {
    res.status(400).json({error: "invalid operands"});
  } else {
    const sum = Number(a) + Number(b);
    res.status(200).json(sum);
  }
})

server.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});