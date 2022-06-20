const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiswaPost = new Schema({
  nama: {
    type: String,
    required: true
  },
  umur: {
    type: Number,
    required: true
  }, 
  ttl: {
    type: String,
    required: true
  }, 
  alamat: {
    type: String,
    required: true
  }, 
  asal_sekolah: {
    type: String,
    required: true
  },
  lulusan_tingkat: {
    type: String,
    required: true
  },
  no_HP: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('SiswaPost', SiswaPost);
