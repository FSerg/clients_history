import mongoose from 'mongoose';

const { Schema } = mongoose;
const docSchema = new Schema({
  product: { type: String, index: true },
  DocNumber: String,
  DocDate: Date,
  Sum: Number,
  Year: String,
  Quarter: String,
  Month: String,
  WeekOfYear: String,
  DayOfYear: String,
  WeekDay: String,
  Day: String,
  Hour: String,
  ClientCode: { type: String, index: true },
  Client: String,
  Sender: String,
  Employee: String,
  CreatedBy: String,
  isPrimary: Boolean,
  isProf: Boolean,
  Cashdesk: String,
  Note: String,
  isMedDoc: Boolean,
  MedDocNumber: String,
  Services: [
    {
      _id: false,
      ServiceCode: String,
      ServiceName: String,
      Count: Number,
      Price: Number,
      DiscountPercent: Number,
      DiscountSum: Number,
      Sum: Number,
      Total: Number,
      Employee: String
    }
  ]
});

module.exports = mongoose.model('doc', docSchema);
