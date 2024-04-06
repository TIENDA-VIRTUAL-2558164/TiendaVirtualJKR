"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var descuentoSchema = Schema({
    titulo: {type: String, required: true},
    banner: {type: String, required: true}, //porcentaje o precio fijo 
    descuento: {type: Number, required: true},  
    FechaInicio: {type: String, required: true},  
    FechaFin: {type: String, required: true},  
    createdAt: {type: Date,default:Date.now ,required: true}

});

module.exports = mongoose.model('descuento',descuentoSchema);