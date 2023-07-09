const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { 
  add, 
  datas, 
  show, 
  update, 
  del,
} = require('../controllers/data');

// POST handle
router.post(
  '/add',
  add
);

// GET handle
router.get('/datas', datas);
router.get('/show/:getId', show);
router.put('/update/:getId', update);
router.delete('/delete/:getId', del);


module.exports = router;