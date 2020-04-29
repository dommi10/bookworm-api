import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";
import { sendResetPasswordMail } from "../mailer";
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

router.post("/confirmation", (req, res) => {
  const { token } = req.body;

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  )
    .then((user) =>
      user
        ? res.status(200).json({ user: user.toAuthJSON() })
        : res.status(400).json({ errors: { global: "invalid token" } })
    )
    .catch((err) => res.status(400).json({ errors: parseErrors(err) }));
});

router.post("/reset_password_request", (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) res.status(400).json({ errors: { global: "invalid email" } });
      else {
        sendResetPasswordMail(user);
        res.status(200).json({ user: user.toAuthJSON() });
      }
    })
    .catch((errors) => res.status(200).json({ errors: parseErrors(errors) }));
});

router.post("/validate_token", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) res.status(401).json({});
    else res.status(200).json({});
  });
});

router.post("/reset_password", (req, res) => {
  const { token, password } = req.body.data;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ errors: { global: "invalid token" } });
    } else {
      let _id = decoded.id;
      _id = mongoose.Types.ObjectId(_id);

      User.findOne({ _id }).then((user) => {
        if (user) {
          user.setPassword(password);
          user.save();
          res.status(200).json({ user: user.toAuthJSON() });
        } else res.status(404).json({ errors: { global: "invalid token" } });
      });
    }
  });
});

export default router;
