import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match : [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'please use a valid email']
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
    default: Date.now
  },
  isVerified : {
    type : Boolean, 
    default : false,
}
});

export const User = mongoose.model.User || mongoose.model("User", userSchema);
