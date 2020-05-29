const express = require('express');

const router = express.Router();

const Word = require('../models/word');

router.get('/', (req, res) => {
  res.render('homepage');
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
router.get('/costskeeper/', async (req, res) => {
  const items = await Word.find();
  const total = await items.reduce((p, c) => p + c.price, 0);
  const broccoli = await items.filter((item) => item.name == 'брокколи');
  const broccolitotal = await broccoli.reduce((p, c) => p + c.price, 0);
  const milk = await items.filter((item) => item.name == 'молоко');
  const milktotal = await milk.reduce((p, c) => p + c.price, 0);
  const cake = await items.filter((item) => item.name == 'тортик');
  const caketotal = await cake.reduce((p, c) => p + c.price, 0);
  const bread = await items.filter((item) => item.name == 'хлеб');
  const breadtotal = await bread.reduce((p, c) => p + c.price, 0);
  const meat = await items.filter((item) => item.name == 'мясо');
  const meattotal = await meat.reduce((p, c) => p + c.price, 0);
  const fish = await items.filter((item) => item.name == 'рыба');
  const fishtotal = await fish.reduce((p, c) => p + c.price, 0);
  res.render('index', {
    words: items, total, broccolitotal, milktotal, caketotal, breadtotal, meattotal, fishtotal
  });
});
module.exports = router;
