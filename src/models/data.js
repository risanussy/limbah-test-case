const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataPost = new Schema({
  no_docs: {
    type: Number,
    required: true
  },
  date_in: {
    type: String,
    required: true
  }, 
  sumber: {
    type: String,
    required: true
  }, 
  jenis: {
    type: String,
    required: true
  }, 
  b3_in: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('data', DataPost);
