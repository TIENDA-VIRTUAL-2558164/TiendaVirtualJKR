const Descuento = require('../models/descuento');

const RegistroDescuento = async function (req,res) {
    // if (req.user) {
    //     if (req.user.role == 'admin') {
    //         let data = req.body;
    //         if(req.files == undefined) {
    //             var portada_name = data.portada;
    //             data.portada = portada_name;
    //         }else{
    //         var img_path = req.files.portada.path;
    //         var name = img_path.split('\\');
    //         var portada_name = name[2];
    //         data.portada = portada_name;
    //         }
            
            
    //         data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    //         let reg = await Producto.create(data);

    //         let inventario = await Inventario.create({
    //             admin: req.user.sub,
    //             cantidad: data.stock,
    //             proveedor: 'primer registro',
    //             producto: reg._id 
    //         });

    //         res.status(200).send({data:reg,inventario:inventario});

    //     } else {
    //         res.status(500).send({message: 'NoAccess'})
    //     }
    // } else {
    //     res.status(500).send({message: 'NoAccess'})
    // }
}

module.exports = {
    RegistroDescuento
}