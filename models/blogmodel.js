const mongoose = require("mongoose");

const validCategories = ["news", "expertise"];
const validStatuses = ["published", "drafted"];

const blogSchema = new mongoose.Schema(
  {
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: validCategories,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "drafted",
    enum: validStatuses,
  },
},
{
  timestamps: true,
}

);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
