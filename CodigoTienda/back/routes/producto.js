'use strict'

let espress = require('express');
var productoControler = require('../controllers/productoControler');

var api = espress.Router();
let auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty'); 
var path = multiparty({uploadDir: './uploads/productos'});

// Schema of Products
/**
 * @swagger
 *  components:
 *   schemas:
 *    producto:
 *     type: object
 *     properties:
 *      galeria:
 *        type: Array
 *        description: Glaeria del producto
 *      nventas:
 *        type: Integer
 *        description: Cantidad de ventas del producto
 *      variedades:
 *        type: Array
 *        description: Variedad del producto     
 *      npuntos:
 *        type: Integer
 *        description: puntos para compra del producto      
 *      estado:
 *        type: String
 *        description: estado creacion producto      
 *      titulo:
 *        type: String
 *        description: nombre del producto     
 *      stock:
 *        type: Integer
 *        description: Cantidad disponible del producto     
 *      precio:
 *        type: Integer
 *        description: Valor del producto     
 *      descripcion:
 *        type: String
 *        description: Descripcion corta del producto     
 *      contenido:
 *        type: String
 *        description: Descripcion especifica del producto    
 *      categoria:
 *        type: String
 *        description: Categoria corta del producto    
 *      portada:
 *        type: String
 *        description: Imagen principal corta del producto    
 *      slug:
 *        type: String
 *        description: Slug corta del producto    
*/

// Schema of Inventarios
/**
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *   schemas:
 *    Inventario:
 *     type: object
 *     properties:
 *      admin:
 *        type: Id
 *        description: Id del admin que ingresa el producto
 *      cantidad:
 *        type: integer
 *        description: Cantidad del producto ingresado
 *      proveedor:
 *        type: string
 *        description: Proveedor del producto     
 *      producto:
 *        type: Id
 *        description: Id del producto ingresado      
 *     security:
 *       - bearerAuth: []
*/

//PRODUCTOS
api.post('/registro_producto_admin',[auth.auth,path], productoControler.registro_producto_admin);
api.get('/listar_productos/:filtro?',auth.auth,productoControler.listar_productos);
api.get('/obtener_portada/:img',productoControler.obtener_portada);
api.get('/obtener_producto/:id',auth.auth,productoControler.obtener_producto_admin);
api.put('/editar_producto/:id',[auth.auth,path],productoControler.editar_producto_admin);
api.delete('/eliminar_producto/:id',auth.auth,productoControler.eliminar_Producto_admin);
api.put('/editar_variedad_admin/:id',auth.auth,productoControler.editar_variedad_admin);
api.put('/Agregar_galeria/:id',[auth.auth,path],productoControler.Agregar_galeria_admin);
api.put('/Eliminar_galeria_admin/:id',auth.auth,productoControler.Eliminar_img_galeria_admin);


/**
 * @swagger
 * /api/listar_inventario:
 *   get:
 *     summary: get all Inventarios
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Solicitud Satisfactoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventario'  
 *     security:
 *      - bearerAuth: []
 * /api/registrar_inventario:
 *   post:
 *     summary: Agrergar inventario al producto
 *     tags: [Inventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         description: Inventario agregado correctamente
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
 * /api/eliminar_inventario/{id}:
 *   delete:
 *     summary: Eliminar un inventario por su ID 
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del inventario a eliminar
 *     responses:
 *       200:
 *         description: Inventario eliminado correctamente
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: [] 
*/

//INVENTATIOS

api.get('/listar_inventario/:id?',auth.auth, productoControler.listar_inventario );
api.delete('/eliminar_inventario/:id',auth.auth,productoControler.eliminar_inventario);
api.post('/registrar_inventario',auth.auth,productoControler.registro_inventario_admin);

//TIENDA


/**
 * @swagger
 * /api/listar_productos_tienda:
 *   get:
 *     summary: get all producto
 *     tags: [producto]
 *     responses:
 *       200:
 *         description: Solicitud Satisfactoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/producto' 
 * /api/registro_producto_admin:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/producto'
 *     responses:
 *       200:
 *         description: producto creado correctamente
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
 * /api/editar_producto/{id}:
 *   put:
 *     summary: Actualizar un producto existente por su ID
 *     tags: [producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/producto'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: []
 * /api/eliminar_producto/{id}:
 *   delete:
 *     summary: Eliminar un producto existente por su ID
 *     tags: [producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *      - bearerAuth: []
 */

api.get('/listar_productos_tienda/:filtro?',productoControler.listar_productos_tienda);
api.get('/info_productos_tienda/:slug',productoControler.info_producto_tienda);
api.get('/listar_productos_recomendados/:categoria',productoControler.listar_productos_tienda_recomendados);



module.exports = api;