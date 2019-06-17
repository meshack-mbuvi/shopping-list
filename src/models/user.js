import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;
/**
 * Schema for the Users collection
 */

const UserSchema = new mongoose.Schema ({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  shoppingItems: [{type: ObjectId, ref: 'Items'}],
});

export default mongoose.model ('User', UserSchema);
