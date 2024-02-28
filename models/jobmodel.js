const mongoose = require("mongoose");

const validContractTypes = ["fulltime", "parttime"];

const jobSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contractType: {
      type: String,
      required: true,
      enum: validContractTypes,
    },
    location: {
      type: String,
      required: true,
    },
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
