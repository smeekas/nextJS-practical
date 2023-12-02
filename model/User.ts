import mongoose, { Document, ObjectId, Schema } from "mongoose";
export interface UserDoc extends mongoose.Document {
  email: {
    type: string;
    required: boolean;
    unique: boolean;
  };
  password: {
    type: string;
    required: boolean;
  };
  userName: {
    type: string;
    unique: boolean;
    required: boolean;
  };
}

export interface Usertype extends Document {
  password: string;
  email: string;
  userName: string;
  posts: ObjectId[];
}
const userSchema: Schema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  posts: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Posts",
  },
});

// export default

module.exports =
  mongoose.models.User || mongoose.model<Usertype>("User", userSchema);
