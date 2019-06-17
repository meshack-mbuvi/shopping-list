import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;
/**
 * Schema for the Items collection
 */

const ItemSchema = new mongoose.Schema ({
  name: {type: String},
  quantity: {type: Number, default: 1},
  purchased: {type: Boolean, default: false},
});

export default mongoose.model ('Item', ItemSchema);
