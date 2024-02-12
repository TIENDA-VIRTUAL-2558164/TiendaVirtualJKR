'use strict'

var espress = require('express');
var configControler = require('../controllers/configControler');

var api = espress.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty'); 
var path = multiparty({uploadDir: './uploads/configuraciones'});

api.put('/actualizar_config/:id',[auth.auth,path],configControler.actualizar_config);
api.get('/obtener_config',auth.auth,configControler.obtener_config);
api.get('/obtener_img/:img',configControler.obtener_img);
api.get('/obtener_config_publico',configControler.obtener_config_publico);

module.exports = api;