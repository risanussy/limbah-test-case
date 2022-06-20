const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { daftarSiswa } = require('../controllers/siswa');

// POST handle
router.post(
  '/daftarsiswa', 
  [
    body("nama").isLength({min: 3}).withMessage("input nama terlalu pendek"),
    body("alamat").isLength({min: 5}).withMessage("input alamat tidak sesuai"),
    body("no_HP").isLength({min: 11, max: 14}).withMessage("input nomer HP tidak sesuai"),
  ],
  daftarSiswa
);

// GET handle
// router.get('/siswa', dataSiswa);

module.exports = router;