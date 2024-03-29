'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    cliente: { type: Schema.ObjectId, ref: 'cliente', required: true },
    destinatario: { type: String, required: true},
    dni: { type: String, required: true},
    direccion: { type: String, required: true},
    pais: { type: String, required: true},
    departamento: { type: String, required: true},
    municipio: { type: String, required: false},
    localidadBarrio: { type: String, required: false},
    telefono: { type: String, required: true},
    DirPrincipal: { type: Boolean, required: true},
    createdAt: {type: Date,default:Date.now ,required: true}
});

module.exports = mongoose.model('direccion',DireccionSchema);