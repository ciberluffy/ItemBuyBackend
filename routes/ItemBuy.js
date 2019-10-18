'use strict'

var express = require('express');
var itemBuyController = require('../controllers/ItemBuy');

var api = express.Router();

api.post('/register', itemBuyController.saveItemBuy);
api.put('/update/:id', itemBuyController.updateItemBuy);
api.get('/get-item-buys', itemBuyController.getItemBuys);
api.get('/get-item-buy/:id', itemBuyController.getItemBuy);
api.delete('/delete/:id', itemBuyController.deleteItemBuy);
api.get('/get-item-buys-tobuy', itemBuyController.getItemBuysToBuy);
api.get('/get-item-buys-purchased', itemBuyController.getItemBuysPurchased);

module.exports = api;