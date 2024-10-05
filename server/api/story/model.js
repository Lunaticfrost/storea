const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: [arrayMinLength, 1],
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      validate: [arrayMinLength, 1],
    },
  ],
  type: {
    type: String,
    enum: ["common", "real", "supernatural", "sci-fi", "horror"],
    default: "common",
    required: true,
    validate: {
      validator: function (value) {
        return ["common", "real", "supernatural", "sci-fi", "horror"].includes(value);
      },
      message: "Invalid story type",
    },
  },
  isFlagged: {
    type: Boolean,
    default: false,
  },
});

export const Story = mongoose.model("Story", storySchema);