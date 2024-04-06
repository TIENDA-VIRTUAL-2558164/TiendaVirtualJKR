const Venta = require('../models/venta');
const DetVenta = require('../models/detalleventa');
const Producto = require('../models/producto');
const Carrito = require('../models/carrito');

const RegistroCompra = async function (req,res) {
    if (req.user) {
        const data = req.body;
        const detalle = data.detalles;
        let nventa;

        const ventaLast = await Venta.find().sort({createdAt:-1})
        if ( ventaLast.length == 0) {
            serie = '001';
            correlativo = '000001'

            nventa = serie + '-' + correlativo;
        }else{
            const lastVenta = ventaLast[0].nventa;
            const arrNventa = lastVenta.split('-');

            if (arrNventa[1] != '999999') {
                const newCorrelativo = zfill(parseInt(arrNventa[1])+1,6)
                nventa = arrNventa[0]+ '-' + newCorrelativo;
            } else if(arrNventa[1] == '999999') {
                const newSerie = zfill(parseInt(arrNventa[0])+1,3)
                nventa = newSerie + '-000001' ;
            }

        }

        data.nventa = nventa;
        data.estado = 'procesando';

        const venta = await Venta.create(data);

        detalle.forEach( async element => {
            element.venta = venta._id
            await DetVenta.create(element);
            const ItemProducto = await Producto.findById({_id:element.producto});
            const NewStock = ItemProducto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id:element.producto},{stock:NewStock});

            //Limpiar carrito
            await Carrito.remove({cliente:data.cliente})

        });

        res.status(200).send({venta:venta});

     } else {
        res.status(500).send({ message: "NoAcces" });
     }
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}
module.exports = {
    RegistroCompra
}