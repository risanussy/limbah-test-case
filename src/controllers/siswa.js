const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const SiswaPost = require('../models/siswa');

exports.daftarSiswa = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if(!req.file){
    const err = new Error('Image Harus Diupload!');
    err.errorStatus = 422;
    throw err;
  }

  const nama = req.body.nama;
  const umur = req.body.umur;
  const ttl = req.body.ttl;
  const alamat = req.body.alamat;
  const asal_sekolah = req.body.asal_sekolah;
  const lulusan_tingkat = req.body.lulusan_tingkat;
  const no_HP = req.body.no_HP;
  const foto = req.file.path;

  const Posting = new SiswaPost({
    nama,
    umur, 
    ttl, 
    alamat, 
    asal_sekolah,
    lulusan_tingkat,
    no_HP,
    foto,
    doc: {
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

exports.dataSiswa = (req, res, next) => {
  SiswaPost.find()
    .then(result => {
      res.status(200).json({
        message: "Data Siswa Berhasil Diambil!",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.siswaById = (req, res, next) => {
  const siswaId = req.params.getId;
  SiswaPost.findById(siswaId)
    .then(result => {
      if(!result){
        const error = new Error('Data Siswa Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      res.status(200).json({
        message: "Data Siswa Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.updateSiswa = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if(!req.file){
    const err = new Error('Image Harus Diupload!');
    err.errorStatus = 422;
    throw err;
  }

  const nama = req.body.nama;
  const umur = req.body.umur;
  const ttl = req.body.ttl;
  const alamat = req.body.alamat;
  const asal_sekolah = req.body.asal_sekolah;
  const lulusan_tingkat = req.body.lulusan_tingkat;
  const no_HP = req.body.no_HP;
  const foto = req.file.path;

  const siswaId = req.params.getId;

  SiswaPost.findById(siswaId)
    .then(result => {
      if(!result){
        const error = new Error('Data Siswa Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }

      result.nama = nama;
      result.umur = umur;
      result.ttl = ttl;
      result.alamat = alamat; 
      result.asal_sekolah = asal_sekolah;
      result.lulusan_tingkat = lulusan_tingkat;
      result.no_HP = no_HP;
      result.foto = foto;

      return result.save();
    })
    .then(result => {   
      res.status(200).json({
        message: "Data Siswa Berhasil Diupdate",
        data: result
      })
    })
    .catch(err => next(err))


}

exports.deleteSiswa = (req, res, next) => {
  const siswaId = req.params.getId;
  SiswaPost.findById(siswaId)
    .then(result => {
      if(!result){
        const error = new Error('Data Siswa Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }

      removeImage(result.image)
      return SiswaPost.findByIdAndRemove(siswaId)
    })
    .then(result => {      
      res.status(200).json({
        message: "Data Siswa Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}

const removeImage = (filePath) => {
  filePath = path.join(`${__dirname}../..${filePath}`);
  fs.unlink(filePath, err => console.log(err))
}