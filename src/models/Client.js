import mongoose from 'mongoose';

const { Schema } = mongoose;
const docSchema = new Schema({
  Code: String,
  FullName: { type: String, index: true },
  FirstName: String,
  MiddleName: String,
  LastName: String,
  Sex: String,
  BirthDay: Date,
  Age: Number,
  Phone: String,
  Passport: String,
  Address: String,
  Email: String,
  Debt: Number,
  Blocked: Boolean,
  CreatedAt: Date,
  CreatedBy: String
});

module.exports = mongoose.model('Client', docSchema);
