import express from "express";
import User from "../models/user";
import parseErrors from "../utils/parseErrors";

const users = express.Router();

users.post("/", (req, res) => {
  const { email, password } = req.body.user;

  const user = new User({ email: email });

  user.setPassword(password);
  user
    .save()
    .then((newUser) => {
      res.status(200).json({ user: newUser.toAuthJSON() });
    })
    .catch((error) => {
      res.status(400).json({ errors: parseErrors(error.errors) });
    });
});

export default users;
