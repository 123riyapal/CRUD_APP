const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Mathematics: { type: Number, required: true, min: 0, max: 100 }, 
    Hindi: { type: Number, required: true, min: 0, max: 100 },
    English: { type: Number, required: true, min: 0, max: 100 },
    Physics: { type: Number, required: true, min: 0, max: 100 },
    Chemistry: { type: Number, required: true, min: 0, max: 100 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
