'use strict'

// modulos
var moment = require('moment');

// modelos
var ItemBuy = require('../models/ItemBuy');

// acciones

function saveItemBuy(req, res) {
   // Crear el objeto de itemBuy
   var itemBuy = new ItemBuy(); 

   // Recoger los parametros
   var params = req.body;

   itemBuy.name = (params.name) ? params.name : '';
   itemBuy.count = (params.count) ? params.count : 0;
   itemBuy.minPieceValue = (params.minPieceValue) ? params.minPieceValue : 0;
   itemBuy.maxPieceValue = (params.maxPieceValue) ? params.maxPieceValue : 0;
   itemBuy.finalPieceValue = (params.finalPieceValue) ? params.finalPieceValue : 0;
   itemBuy.minTotalValue = (params.minTotalValue) ? params.minTotalValue : 0;
   itemBuy.maxTotalValue = (params.maxTotalValue) ? params.maxTotalValue : 0;
   itemBuy.finalTotalValue = (params.finalTotalValue) ? params.finalTotalValue : 0;
   itemBuy.isPurchased = (params.isPurchased) ? params.isPurchased : false;
   itemBuy.dateToBuy = (params.dateToBuy) ? params.dateToBuy : moment().toISOString();
   itemBuy.datePurchased = (params.datePurchased) ? params.datePurchased : '';
   itemBuy.dateLastUpdate = (params.dateLastUpdate) ? params.dateLastUpdate : moment().toISOString();
   itemBuy.delete = false;
   if (params.order && params.order != 0){
      itemBuy.order = params.order;
      // Guardar itemBuy en base de datos
      itemBuy.save((err, itemBuyStored) => {
         if(err) {
            res.status(500).send({message: 'Error al guardar el itemBuy'});
         }
         else {
            if(!itemBuyStored){
               res.status(404).send({message: 'No se ha guardado el itemBuy'});
            }
            else {
               res.status(200).send(
                  itemBuyStored
               );
            }
         }
      });
   }
   else {
      ItemBuy.countDocuments({delete: false, isPurchased: false}, (errCount, c) => {
         if(errCount) {
            res.status(500).send({message: 'Error al contar los itemBuys'});
         }
         itemBuy.order = c + 1;
         // Guardar itemBuy en base de datos
         itemBuy.save((err, itemBuyStored) => {
            if(err) {
               res.status(500).send({message: 'Error al guardar el itemBuy'});
            }
            else {
               if(!itemBuyStored){
                  res.status(404).send({message: 'No se ha guardado el itemBuy'});
               }
               else {
                  res.status(200).send(
                     itemBuyStored
                  );
               }
            }
         });
      });
   }
   
}

function updateItemBuy(req, res) {
   var itemBuyId = req.params.id;
   var update = req.body;
   update.delete = false;

   ItemBuy.findByIdAndUpdate(itemBuyId, update, { new: true }, (err, itemBuyUpdated) => {
      if(err){
         res.status(500).send({
            message: "Error al actualizar itemBuy"
         });
      }
      else{
         if(!itemBuyUpdated){
            res.status(404).send({
               message: "No se ha podido actualizar el itemBuy"
            });
         }
         else {
            res.status(200).send(
               itemBuyUpdated
            );
         }
      }
   });
}

function getItemBuys(req, res){
   ItemBuy.find({delete: false}).exec((err, itemBuys) => {
      if(err){
         res.status(500).send({
            message: 'error en la peticion'
         });
      }
      else {
         if(!itemBuys){
            res.status(404).send({
               message: 'no hay itembuys'
            });
         }
         else{
            res.status(200).send(
               itemBuys
            );
         }
      }
   });
}

function getItemBuysToBuy(req, res){
   ItemBuy.find({delete: false, isPurchased: false}).sort('order').exec((err, itemBuys) => {
      if(err){
         res.status(500).send({
            message: 'error en la peticion'
         });
      }
      else {
         if(!itemBuys){
            res.status(404).send({
               message: 'no hay itembuys'
            });
         }
         else{
            res.status(200).send(
               itemBuys
            );
         }
      }
   });
}

function getItemBuysPurchased(req, res){
   ItemBuy.find({delete: false, isPurchased: true}).sort('order').exec((err, itemBuys) => {
      if(err){
         res.status(500).send({
            message: 'error en la peticion'
         });
      }
      else {
         if(!itemBuys){
            res.status(404).send({
               message: 'no hay itembuys'
            });
         }
         else{
            res.status(200).send(
               itemBuys
            );
         }
      }
   });
}

function getItemBuy(req, res) {
   var itemBuyId = req.params.id;

   ItemBuy.findOne({_id: itemBuyId, delete: false}).exec((err, itemBuy) => {
      if(err){
         res.status(500).send({
            message: 'error en la peticion'
         });
      }
      else {
         if(!itemBuy){
            res.status(404).send({
               message: 'No existe ese item buy'
            });
         }
         else{
            res.status(200).send({
               itemBuy
            });
         }
      }
   });
}

function deleteItemBuy(req, res){
   var itemBuyId = req.params.id;

   ItemBuy.findByIdAndUpdate(itemBuyId, {delete: true}, (err, itemBuyUpdated) => {
      if(err){
         res.status(500).send({
            message: "Error al eliminar itemBuy"
         });
      }
      else{
         if(!itemBuyUpdated){
            res.status(404).send({
               message: "No se ha podido eliminar el itemBuy"
            });
         }
         else {
            res.status(200).send({
               itemBuy: itemBuyUpdated
            });
         }
      }
   });
}

module.exports = {
   saveItemBuy,
   updateItemBuy,
   getItemBuys,
   getItemBuy,
   deleteItemBuy,
   getItemBuysToBuy,
   getItemBuysPurchased
};