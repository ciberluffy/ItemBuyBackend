'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemBuySchema = Schema({
   name: String,
   count: Number,
   minPieceValue: Number,
   maxPieceValue: Number,
   finalPieceValue: Number,
   minTotalValue: Number,
   maxTotalValue: Number,
   finalTotalValue: Number,
   isPurchased: Boolean,
   order: Number,
   dateToBuy: String,
   datePurchased: String,
   dateLastUpdate: String,
   delete: Boolean
});

module.exports = mongoose.model('ItemBuy', ItemBuySchema);