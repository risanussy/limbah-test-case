const DataPost = require('../models/data');

exports.add = (req, res, next) => {
  const no_docs = req.body.no_docs;
  const date_in = req.body.date_in;
  const sumber = req.body.sumber;
  const jenis = req.body.jenis;
  const b3_in = req.body.b3_in;

  const Posting = new DataPost({
    no_docs,
    date_in, 
    sumber, 
    jenis, 
    b3_in,
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

exports.datas = (req, res, next) => {
  DataPost.find()
    .then(result => {
      res.status(200).json({
        message: "Data Berhasil Diambil!",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.show = (req, res, next) => {
  const getId = req.params.getId;
  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      res.status(200).json({
        message: "Data Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
  const no_docs = req.body.no_docs;
  const date_in = req.body.date_in;
  const sumber = req.body.sumber;
  const jenis = req.body.jenis;
  const b3_in = req.body.b3_in;

  const getId = req.params.getId;

  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }

      result.no_docs = no_docs;
      result.date_in = date_in;
      result.sumber = sumber;
      result.jenis = jenis; 
      result.b3_in = b3_in;

      return result.save();
    })
    .then(result => {   
      res.status(200).json({
        message: "Data Berhasil Diupdate",
        data: result
      })
    })
    .catch(err => next(err))


}

exports.delete = (req, res, next) => {
  const getId = req.params.getId;
  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Siswa Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      
      return DataPost.findByIdAndRemove(getId)
    })
    .then(result => {      
      res.status(200).json({
        message: "Data Siswa Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}