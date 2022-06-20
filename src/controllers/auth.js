exports.register = (req, res, next) => {
  const nama = req.body.nama;
  const email = req.body.email;
  const sandi = req.body.sandi;
  
  const result = {
    message: 'Register Success',
    data: {
      uid: 1,
      nama, email
    }
  }
  res.status(201).json(result);
}