const express = require('express');

const router = express.Router();

// const Word = require('../models/word')

router.get('/', (req, res) => {
  res.render('index');
});
// router.get('/', async (req, res) => {
//   let newWord = await new Word();
//   res.json();
// });
module.exports = router;
