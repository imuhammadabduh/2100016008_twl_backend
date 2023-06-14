import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  displayName: string;
  password: string;
  profile: object;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  profile: [{ type: Object }],
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
