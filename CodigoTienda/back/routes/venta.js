'use strict'

var espress = require('express'); 
var ventaControler = require('../controllers/ventacontroler');

var auth = require('../middlewares/authenticate');
var api = espress.Router();

api.post('/registroCompra',auth.auth, ventaControler.RegistroCompra);

module.exports = api;