'use strict'

var espress = require('express');
var ClienteControler = require('../controllers/clienteControler');

var api = espress.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cliente',ClienteControler.registro_cliente);
api.post('/login_cliente', ClienteControler.login_cliente);


//desde el apartado de admins.
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',auth.auth,ClienteControler.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin',auth.auth,ClienteControler.registro_cliente_admin);
api.get('/obtener_cliente/:id' ,auth.auth,ClienteControler.obtener_cliente_admin);
api.put('/editar_cliente/:id',auth.auth,ClienteControler.editar_cliente_admin);
api.delete('/eliminar_cliente/:id',auth.auth,ClienteControler.eliminar_cliente_admin);

//desde el apartado de clientes.

api.get('/obtener_usuario_cliente/:id' ,auth.auth,ClienteControler.obtener_cliente);
api.put('/editar_perfil_cliente/:id' ,auth.auth,ClienteControler.editar_perfil_cliente);

module.exports = api;