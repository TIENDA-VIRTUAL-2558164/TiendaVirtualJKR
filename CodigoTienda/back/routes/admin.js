'use strict'

var espress = require('express');
var adminControler = require('../controllers/AdminControler');
const  auth  = require('../middlewares/authenticate');

var api = espress.Router();

// Schema of Admins
/**
 * @swagger
 *  components:
 *   schemas:
 *    Admin:
 *     type: object
 *     properties:
 *      nombres:
 *        type: String
 *        description: Nombres   
 *      apellidos:
 *        type: String
 *        description: Apellidos    
 *      email:
 *        type: String
 *        description: Direccion de correo electronico      
 *      password:
 *        type: String
 *        description: Contraseña 
 *      telefono:
 *        type: String
 *        description: Numero telefonico o celular   
 *      rol:
 *        type: String
 *        description: Rol asignado     
 *      dni:
 *        type: String
 *        description: Numero de documento            
*/

/**
 * @swagger
 * /api/listarAdmin:
 *   get:
 *     summary: get all Admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Solicitud Satisfactoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'  
 *     security:
 *      - bearerAuth: []
 */

api.post('/registro_admin'  ,adminControler.registro_admin);
api.post('/login_admin', adminControler.login_admin);
api.get('/listarAdmin',auth.auth ,adminControler.ListarAdmins);

module.exports = api;