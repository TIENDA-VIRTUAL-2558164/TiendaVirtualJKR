'use strict'

const carrito = require('../models/carrito');
var Carrito = require('../models/carrito');

const AgregarCarritoCliente = async function(req,res){

    if (req.user) {
        let data = req.body;

        let carrito_cliente = await carrito.find({cliente:data.cliente, producto:data.producto})

        if (carrito_cliente.length == 0) {
            let reg = await Carrito.create(data);
            res.status(200).send({data:reg});  
        } else if (carrito_cliente.length >= 1) {
            res.status(200).send({data:undefined}); 
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const ObtenerCarritoCliente = async function(req,res){

    if (req.user) {
        let IdCliente = req.params['id'];

        let carrito_cliente = await carrito.find({cliente:IdCliente}).populate('producto');
        res.status(200).send({data:carrito_cliente});  

    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}


module.exports = {
    AgregarCarritoCliente,
    ObtenerCarritoCliente	
} 
