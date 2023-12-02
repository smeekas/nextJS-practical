import mongoose, { Document, ObjectId, Schema } from "mongoose";
export interface UserDoc extends mongoose.Document {
  text: {
    type: string;
    required: boolean;
  };
  likes: {
    type: number;
    required: boolean;
  };
  createdBy: {
    required: boolean;
    type: string;
  };
  likedBy: [string];
}
export interface PostType extends Document {
  text: string;
  createdBy: ObjectId;
  likes: number;
  likedBy: ObjectId[];
}
const postSchema: Schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },

    likes: { type: Number, default: 0, required: true },
    likedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// export defaulti
module.exports =
  mongoose.models.Posts || mongoose.model<PostType>("Posts", postSchema);
