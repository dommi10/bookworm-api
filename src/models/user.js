import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//TODO: adduniqueness and email validations to email field
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
    },
    "secretkey"
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model("User", schema);
