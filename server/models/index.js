const Schema = require('mongoose').Schema;
const dbbank = require('./dbbank');

module.exports = {
  user: new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    password: String,
    name: String
  }),
  ...dbbank
}