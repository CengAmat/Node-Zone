const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const user = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password!");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email already exists!");
        return res.redirect("/signup");
      }
      if (password.length < 5) {
        req.flash(
          "error",
          "Your password needs to be at least 5 characters long"
        );
        return res.redirect("/signup");
      }
      if (password !== confirmPassword) {
        req.flash("error", "Passwords do NOT match!");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
          return transporter
            .sendMail({
              to: email,
              from: "cengamat@gmail.com",
              subject: "Signup succeeded!",
              html: "<h1>You successfully signed up!</h1>",
            })
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found!");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 360000;
        return user.save();
      })
      .then(() => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "cengamat@gmail.com",
          subject: "Password Reset",
          html: `
        <p>You requested a password reset</p>
        <p>Click this <a href='http://localhost:3001/reset/${token}'>link</a> to set a new password</p>
        `,
        });
      })
      .catch((err) => console.log(err));
  });
};
