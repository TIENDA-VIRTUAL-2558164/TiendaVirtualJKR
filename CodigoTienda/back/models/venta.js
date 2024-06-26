"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    cliente: {type: Schema.ObjectId, ref: 'cliente' ,  required: true},
    nventa: {type: String, required: true},
    subtotal: {type: Number,  required: true},
    envioTitulo: {type: String, required: true},
    envioPrecio: {type: Number, required: true},
    transaccion: {type: String, required: false},
    cupon: {type: String, required: false},
    estado: {type: String, required: true},
    direccion: {type: Schema.ObjectId, ref: 'direccion', required: true},
    nota: {type: String, required: false},
    createdAt: {type: Date,default:Date.now ,required: true},
});

module.exports = mongoose.model('venta',VentaSchema);