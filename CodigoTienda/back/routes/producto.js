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
 *   schemas:
 *    Inventario:
 *     type: object
 *     properties:
 *      admin:
 *        type: Id
 *        description: Id del admin que ingresa el producto
 *      cantidad:
 *        type: Integer
 *        description: Cantidad del producto ingresado
 *      proveedor:
 *        type: String
 *        description: Proveedor del producto     
 *      producto:
 *        type: Id
 *        description: Id del producto ingresado      
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

//INVENTATIOS
api.get('/listar_inventario/:id',auth.auth, productoControler.listar_inventario );
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