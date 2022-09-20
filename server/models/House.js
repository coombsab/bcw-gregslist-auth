import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true, max: 1000 },
  bathrooms: { type: Number, required: true, max: 1000 },
  levels: { type: Number, required: true, max: 1000 },
  imgUrl: { type: String, default: "", maxlength: 500 },
  year: { type: Number, required: true, max: new Date().getFullYear() },
  price: { type: Number, required: true, max: 100000000 },
  description: { type: String, required: true, maxlength: 500 },
  sellerId: { type: ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: { virtuals: true }})

HouseSchema.virtual("seller", {
  localField: "sellerId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})