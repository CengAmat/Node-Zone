const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("/users middleware");
  res.send("<h1>This is users page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("middleware");
  res.send("<h1>This is main page</h1>");
});

// app.use((req, res, next) => {
//   console.log("This is first middleware!");
//   next();
// });

// app.use((req, res, next) => {
//   res.send("<h1>This is second middleware</h1>");
// });

app.listen(3000);
