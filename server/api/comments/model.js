const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  relatedTo: {
    type: String,
    enum: ["story", "comment"],
  },
  relatedToObjectId: {
    type: Schema.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  edited: {
    previousComment: {
      type: String,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

export const Comment = mongoose.model("Comment", commentSchema);