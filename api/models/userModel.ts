import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userModel = new Schema({
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  role: { type: String },
  clientId: { type: String },
});

export const userSchema = model("user", userModel, "users"); // 3rd arg, = collection-name

export interface UserModelType {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  clientId: string;
}
