import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  login: { type: String, require: true },
  password: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  createDate: {
    type: Date,
    default: () => Date.now(),
  },
  birthDay: { type: Date },
});
