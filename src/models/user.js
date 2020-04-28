import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//TODO: adduniqueness and email validations to email field
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

export default mongoose.model("User", schema);
