import express from "express";
import User from "../models/user";

const users = express.Router();

users.post("/", (req, res) => {
  const { email, password } = req.body.user;

  const user = new User({ email: email });

  user.setPassword(password);
  user.save();
});

export default users;
