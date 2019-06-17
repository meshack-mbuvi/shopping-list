import mongoose from 'mongoose';

/**
 * Schema for the Items collection
 */

const ItemSchema = new mongoose.Schema (
  {
    name: {type: String, required: true},
    quantity: {type: Number, default: 1},
    purchased: {type: Boolean, default: false},
    deadline: {type: Date, default: Date.now ()},
  },
  {timestamps: true}
);

export default mongoose.model ('Item', ItemSchema);
