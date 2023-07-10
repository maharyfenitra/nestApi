import * as mongoose from 'mongoose';

export const keyPairsSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  publicKey: { type: String },
  privateKey: { type: [Number], require: true },
  createDate: {
    type: Date,
    default: () => Date.now(),
  },
});
