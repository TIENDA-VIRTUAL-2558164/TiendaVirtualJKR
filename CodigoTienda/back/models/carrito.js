"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    cliente: { type: Schema.ObjectId, ref: 'cliente', required: true },
    producto: { type: Schema.ObjectId, ref: 'producto',  required: true },
    cantidad: { type: Number, require: true},
    variedad: { type: String, required: true},
    createdAt: {type: Date,default:Date.now ,required: true}
});

module.exports = mongoose.model('carrito', CarritoSchema);




