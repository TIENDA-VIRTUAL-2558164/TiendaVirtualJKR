'use strict'

var espress = require('express');
var ClienteControler = require('../controllers/clienteControler');

var api = espress.Router();
var auth = require('../middlewares/authenticate');

// Schema of Clientes
/**
 * @swagger
 *  components:
 *   schemas:
 *    Cliente:
 *     type: object
 *     properties:
 *      perfil:
 *        type: String
 *        description: Imagen del cliente
 *      genero:
 *        type: String
 *        description: Genero 
 *      nombres:
 *        type: String
 *        description: Nombres   
 *      apellidos:
 *        type: String
 *        description: Apellidos    
 *      email:
 *        type: String
 *        description: Direccion de correo electronico      
 *      telefono:
 *        type: String
 *        description: Numero telefonico o celular   
 *      f_nacimiento:
 *        type: String
 *        description: Fecha de nacimiento     
 *      dni:
 *        type: String
 *        description: Numero de documento     
 *      password:
 *        type: String
 *        description: Contraseña     
 *      pais:
 *        type: String
 *        description: Pais de residencia    
*/

api.post('/registro_cliente',ClienteControler.registro_cliente);
api.post('/login_cliente', ClienteControler.login_cliente);

/**
 * @swagger
 * /api/obtener_cliente:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Cliente]
 *     responses:
 *       200:
 *         description: Solicitud Satisfactoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'  
 *     security:
 *      - bearerAuth: []
 * /api/registro_cliente_admin:
 *   post:
 *     summary: Agregar un nuevo cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente creado correctamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: []
 * /api/eliminar_cliente/{id}:
 *   delete:
 *     summary: Eliminar un cliente existente por su ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: []
 * /api/editar_cliente/{id}:
 *   put:
 *     summary: Actualizar un cliente existente por su ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: []
 */


//desde el apartado de admins.
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',auth.auth,ClienteControler.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin',auth.auth,ClienteControler.registro_cliente_admin);
api.get('/obtener_cliente/:id?' ,auth.auth,ClienteControler.obtener_cliente_admin);
api.put('/editar_cliente/:id',auth.auth,ClienteControler.editar_cliente_admin);
api.delete('/eliminar_cliente/:id',auth.auth,ClienteControler.eliminar_cliente_admin);

//desde el apartado de clientes.

api.get('/obtener_usuario_cliente/:id' ,auth.auth,ClienteControler.obtener_cliente);
api.put('/editar_perfil_cliente/:id' ,auth.auth,ClienteControler.editar_perfil_cliente);

//Direcciones

api.post('/registrarDireccion', auth.auth, ClienteControler.registroDireccion);


module.exports = api;