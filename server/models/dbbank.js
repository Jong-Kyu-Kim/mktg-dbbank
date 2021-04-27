const Schema = require('mongoose').Schema;

module.exports = {
  dbbankCustomer: new Schema(
    {
      _id: Schema.Types.ObjectId,
      name: String,
      company: String,
      department: String,
      position: String,
      email: String,
      phone: String,
      from: String,
      note: String,
      classification: String,
      date: { type: Date },
      unsubscribe: { type: Date, default: new Date(0) },
      exist: { type: Boolean, default: true },
      returned: String,
      modify: Date,
      histories: Array,
      count: Number,
    },
    {
      versionKey: false, // __v
    }
  ),
  dbbankSetting: new Schema(
    {
      _id: Schema.Types.ObjectId,
      target: String,
      name: String,
      value: String,
      order: Number,
    },
    {
      versionKey: false, // __v
    }
  ),
};
