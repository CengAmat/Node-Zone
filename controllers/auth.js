const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").trim().split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("64417682de633ef1bce05728")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
