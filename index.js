'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/ItemBuy', 
   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, 
   (err, res) => {
   if(err) {
      throw err;
   } else {
      console.log('La conexion a la base de datos ItemBuy se ha realizado correctamente');
      app.listen(port, () => {
         console.log("El servidor local con Node y Express esta corriendo correctamente...")
      });
   }
}).catch(err => console.log(err));
