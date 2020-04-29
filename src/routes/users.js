import express from "express";
import User from "../models/user";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";

const users = express.Router();

users.post("/", (req, res) => {
  const { email, password } = req.body.user;

  const user = new User({ email });

  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then((newUser) => {
      sendConfirmationEmail(newUser);
      res.status(200).json({ user: newUser.toAuthJSON() });
    })
    .catch((error) => {
      res.status(400).json({ errors: parseErrors(error.errors) });
    });
});

export default users;
