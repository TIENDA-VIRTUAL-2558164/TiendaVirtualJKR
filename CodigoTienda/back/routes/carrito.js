'use strict'

var espress = require('express'); 
var carritoControler = require('../controllers/carritoControler');

var auth = require('../middlewares/authenticate');
var api = espress.Router();

api.post('/agregarCarrito', auth.auth, carritoControler.AgregarCarritoCliente );


module.exports = api;