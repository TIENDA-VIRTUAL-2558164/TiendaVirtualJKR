'use strict'

var espress = require('express');
var CuponControler = require('../controllers/cuponControler');

var api = espress.Router();
var auth = require('../middlewares/authenticate');

//Registro Cupones
api.post('/registro_cupon',auth.auth, CuponControler.registro_cupon_admin);
api.get('/listar_cupon/:filtro?',auth.auth,CuponControler.listar_cupones);
api.get('/obtener_cupon/:id',auth.auth,CuponControler.obtener_cupon);
api.put('/editar_cupon/:id',auth.auth,CuponControler.editar_cupon);
api.delete('/eliminar_cupon/:id',auth.auth,CuponControler.eliminar_cupon);

module.exports = api;