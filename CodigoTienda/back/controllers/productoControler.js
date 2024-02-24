'use strict'

let Producto = require('../models/producto');
let Inventario = require('../models/inventario');
let fs = require('fs');
let path = require('path');


const registro_producto_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;

            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            data.portada = portada_name;
            
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            let reg = await Producto.create(data);

            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'primer registro',
                producto: reg._id 
            });

            res.status(200).send({data:reg,inventario:inventario});

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const listar_productos = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            let filtro = req.params['filtro'];
        
            if (filtro == null || filtro == 'null' ) {
                let reg = await Producto.find();
                res.status(200).send({data:reg});
                
            }else{
                    let reg = await Producto.find({titulo:new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_portada = async function (req,res) {
    let img = req.params['img'];
    fs.stat('./uploads/productos/'+img, function(err){

        if (!err) {
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const obtener_producto_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];

            try {
                let reg = await Producto.findById({_id:id});
                res.status(200).send({data:reg});
                
            } catch (error) {
                res.status(200).send({data:undefined});
            }

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const editar_producto_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            let id = req.params['id'];

            if (req.files) {
                //si hay imagen
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    categoria:  data.categoria,
                    portada: portada_name,

                });
                fs.stat('./uploads/productos/'+reg.portada, function(err){

                    if (!err) {
                        fs.unlink('./uploads/productos/'+reg.portada,(err)=>{
                            if (err) throw err;
                        })
                    } 
                });

                res.status(200).send({data:reg});
            } else {
                //no hay imagen
                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    categoria:  data.categoria,

                })
                res.status(200).send({data:reg});
            }




           

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const eliminar_Producto_admin = async function (req,res){
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];

            let reg = await Producto.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});


        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const listar_inventario = async function (req,res ){
    if (req.user) {
        if (req.user.role == 'admin') {

            let id = req.params['id'];

            let reg = await Inventario.find({producto: id}).populate('admin').sort({createdAt: - 1});
            res.status(200).send({data:reg});

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const eliminar_inventario = async function (req,res ){
    if (req.user) {
        if (req.user.role == 'admin') {

            //obtener id del inventario
            let id = req.params['id'];

            //eliminar el inventario
            let reg = await Inventario.findByIdAndRemove({_id:id});

            //obtener el registro del producto
            let prod = await Producto.findById({_id:reg.producto});

            //calcular el nuevo stock
            let nuevoStock =  parseInt(prod.stock) - parseInt(reg.cantidad);

            //actualizacion del nuevo stock al producto
            let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
                stock: nuevoStock
            });

            res.status(200).send({data:producto});
        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const registro_inventario_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            let data = req.body;

            let reg = await Inventario.create(data);

            //obtener el registro del producto
            let prod = await Producto.findById({_id:reg.producto});

            //calcular el nuevo stock
            let nuevoStock =  parseInt(prod.stock) + parseInt(reg.cantidad);
            
            //actualizacion del nuevo stock al producto
            let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{
                stock: nuevoStock
            });
            
            res.status(200).send({data:reg})

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const editar_variedad_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            let id = req.params['id'];
            
            let reg = await Producto.findByIdAndUpdate({_id:id},{
                titulo_variedad: data.titulo_variedad,
                variedades: data.variedades
            });

            res.status(200).send({data:reg});

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const Agregar_galeria_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            let id = req.params['id'];
            
            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];

          let reg =  await  Producto.findByIdAndUpdate({_id:id},{
                $push:{
                    galeria:{
                        imagen: imagen_name,
                        _id: data._id
                    }
                }
            });

            res.status(200).send({data:reg});

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const Eliminar_img_galeria_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            let id = req.params['id'];      

          let reg =  await  Producto.findByIdAndUpdate({_id:id},{
                $pull:{
                    galeria:{
                        _id: data._id
                    }
                }
            });

            res.status(200).send({data:reg});

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

// METODOS PUBLICOS---------------------------------------------------------------

const listar_productos_tienda = async function (req, res) {
   let filtro = req.params["filtro"];

   let reg = await Producto.find({ titulo: new RegExp(filtro, "i") }).sort({createdAt:-1});
   res.status(200).send({ data: reg });
};

const info_producto_tienda = async function (req, res) {
    let slug = req.params["slug"];
 
    let reg = await Producto.findOne({ slug: slug });
    res.status(200).send({ data: reg });
 };

 const listar_productos_tienda_recomendados = async function (req, res) {
    let Cat = req.params["categoria"];
 
    let reg = await Producto.find({categoria : Cat }).sort({createdAt:-1}).limit(8);
    res.status(200).send({ data: reg });
 };




module.exports={
    registro_producto_admin,
    listar_productos,
    obtener_portada,
    obtener_producto_admin,
    editar_producto_admin,
    eliminar_Producto_admin,
    listar_inventario,
    eliminar_inventario,
    registro_inventario_admin,
    editar_variedad_admin,
    Agregar_galeria_admin,
    Eliminar_img_galeria_admin,
    listar_productos_tienda,
    info_producto_tienda,
    listar_productos_tienda_recomendados
}