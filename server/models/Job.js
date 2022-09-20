import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const JobSchema = new Schema({
  company: { type: String, required: true, maxlength: 30 },
  jobTitle: { type: String, required: true, maxlength: 30 },
  hours: { type: Number, required: true, min: 1, max: 163 },
  rate: { type: Number, required: true, max: 10000 },
  description: { type: String, required: true, maxlength: 500 },
  sellerId: { type: ObjectId, required: true, ref: "Account" }

}, { timestamps: true, toJSON: { virtuals: true }})

JobSchema.virtual("seller", {
  localField: "sellerId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})