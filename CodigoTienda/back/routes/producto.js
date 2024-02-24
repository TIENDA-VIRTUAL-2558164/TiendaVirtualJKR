'use strict'

let espress = require('express');
var productoControler = require('../controllers/productoControler');

var api = espress.Router();
let auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty'); 
var path = multiparty({uploadDir: './uploads/productos'});


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

//INVENTATIOS
api.get('/listar_inventario/:id',auth.auth, productoControler.listar_inventario );
api.delete('/eliminar_inventario/:id',auth.auth,productoControler.eliminar_inventario);
api.post('/registrar_inventario',auth.auth,productoControler.registro_inventario_admin);

//TIENDA
/**
 * @swagger
 *  components:
 *   schemas:
 *    producto:
 *     type: object
 *     properties:
 *      titulo:
 *        type: string
 *        description: Nombre del producto
 *      precio:
 *        type: integer
 *        description: Precio del producto
 */

/**
 * @swagger
 * /api/listar_productos_tienda:
 *   get:
 *     summary: get all producto
 *     tags: [producto]
 *     responses:
 *       200:
 *         description: all  products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/producto'  
 */


api.get('/listar_productos_tienda/:filtro?',productoControler.listar_productos_tienda);
api.get('/info_productos_tienda/:slug',productoControler.info_producto_tienda);
api.get('/listar_productos_recomendados/:categoria',productoControler.listar_productos_tienda_recomendados);



module.exports = api;