const express = require('express');

const router = express.Router();

const Word = require('../models/word');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/costskeeper/', async (req, res) => {
  const items = await Word.find({});
  console.log(items);
  res.render('index', { words: items });
});

router.post('/items', async (req, res) => {
  const { itemNameResult, itemPriceResult } = req.body;
  await Word.create({
    name: itemNameResult,
    price: itemPriceResult,
    author: req.session.user.id,
  });
  res.end();
});
module.exports = router;
