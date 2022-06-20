const { validationResult } = require('express-validator')
const SiswaPost = require('../models/siswa')

exports.daftarSiswa = (req, res, next) => {
  const nama = req.body.nama;
  const umur = req.body.umur;
  const ttl = req.body.ttl;
  const alamat = req.body.alamat;
  const asal_sekolah = req.body.asal_sekolah;
  const lulusan_tingkat = req.body.lulusan_tingkat;
  const no_HP = req.body.no_HP;

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const Posting = new SiswaPost({
    nama,
    umur, 
    ttl, 
    alamat, 
    asal_sekolah,
    lulusan_tingkat,
    no_HP,
    doc: {
      foto : "foto.jpg",
      kk: "kartu-keluarga.jpg",
      ktp: "kartu-tanda-penduduk.jpg",
      surat: "surat-keterangan.jpg"
    }
  })

  Posting.save()
    .then(result => {
      res.status(201).json({
        message : "Data Berhasil Didaftarkan",
        data : result
      });
    })
    .catch(err => console.log('Postingan error : ' + err))
}