'use strict'

const Cliente = require('../models/cliente');
const Direccion = require('../models/direccion')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');


const registro_cliente = async function(req,res){

    var data = req.body;
    var cliente_arr = [];
    
    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        
        //registro
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña',data:undefined});
        }

    }else{
        res.status(200).send({message:'el correo ya existe',data:undefined});
    }
}

const login_cliente = async function(req,res){

    var data = req.body;
    var Cliente_arr = [];

    Cliente_arr = await Cliente.find({email: data.email});

    if(Cliente_arr.length == 0){
        res.status(200).send({message:'No se encontro el usuario', data:undefined});
    }else{
        let user = Cliente_arr[0];

        bcrypt.compare(data.password,user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message:'la contraseña no coincide', data:undefined});
            }
        });

    }

}

const listar_clientes_filtro_admin = async function(req,res){

    if (req.user) {
        if (req.user.role == 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];
        
            if (tipo == null || tipo == 'null' ) {
                let reg = await Cliente.find();
                res.status(200).send({data:reg});
                
            }else{
                if (tipo == 'nombres') {
                    let reg = await Cliente.find({nombres:new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }else if(tipo == 'apellidos'){
                    let reg = await Cliente.find({apellidos:new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }else if(tipo == 'correo'){
                    let reg = await Cliente.find({email:new RegExp(filtro,'i')});
                    res.status(200).send({data:reg});
                }
            }
        
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }

}

const registro_cliente_admin = async function(req,res) {
    if (req.user) {
        if (req.user.role == "admin") {
            let data = req.body;

            bcrypt.hash('123456789',null,null, async function(err,hash) {
                if (hash) {
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                } else {
                    res.status(200).send({message:'error en el servidor',data:undefined});
                }
            });

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_cliente_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];

            try {
                if (id) {
                    let reg = await Cliente.findById({_id:id});
                    res.status(200).send({data:reg});
                } else {
                    let reg = await Cliente.find();
                    res.status(200).send({data:reg});
                }
                
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

const editar_cliente_admin = async function (req,res){
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];
            let data = req.body;

            let reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero 
            });
            res.status(200).send({data:reg});
            

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const eliminar_cliente_admin = async function (req,res){
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];

            let reg = await Cliente.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});


        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_cliente = async function (req,res) {
    if (req.user) {
       

            let id = req.params['id'];

            try {
                let reg = await Cliente.findById({_id:id});
                res.status(200).send({data:reg});
                
            } catch (error) {
                res.status(200).send({data:undefined});
            }

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
}

const editar_perfil_cliente = async function (req,res){
    if (req.user) {

            let id = req.params['id'];
            let data = req.body;

        console.log(data.password);

        if(data.password){
            console.log('con contraseña');
            bcrypt.hash(data.password,null,null, async function(err,hash){
                let reg = await Cliente.findByIdAndUpdate({_id:id},{
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    f_nacimiento: data.f_nacimiento,
                    dni: data.dni, 
                    genero: data.genero,
                    pais : data.pais,
                    password : hash
                });
                res.status(200).send({data:reg});
            });
           

        }else{
            console.log('sin contraseña');
            let reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni, 
                genero: data.genero,
                pais : data.pais
            });

            res.status(200).send({data:reg});
        }

            
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}


/******************************************************** 
 * Direcciones para el envio de productos
*/



const registroDireccion = async function (req, res) {
    
    if (req.user) {
        
        const data = req.body;
        if (data.DirPrincipal) {
            let direcciones  = await Direccion.find({cliente: data.cliente})
            direcciones.forEach(async item =>{
                await Direccion.findByIdAndUpdate({_id:item._id},{DirPrincipal:false})
            })
        }

        let reg = await Direccion.create(data);
        res.status(200).send({data:reg}); 
        
    } else {
        res.status(500).send({message:'NoAcces'});
    }
}

const ObtenerDireccion = async function (req, res) {
    
    if (req.user) {
        
        let id = req.params['id']
        let reg = await Direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});
        res.status(200).send({data:reg}); 
        
    } else {
        res.status(500).send({message:'NoAcces'});
    }
}

const ActualizarDireccionPrincipal = async function (req, res) {
    
    if (req.user) {
        
        const idCliente = req.params['idCliente'];
        const id = req.params['id'];

        let direcciones  = await Direccion.find({cliente: idCliente })
        direcciones.forEach(async item =>{
            await Direccion.findByIdAndUpdate({_id:item._id},{DirPrincipal:false})
        })

        let reg = await Direccion.findByIdAndUpdate({_id:id},{DirPrincipal:true});
        res.status(200).send({data:reg}); 
        
    } else {
        res.status(500).send({message:'NoAcces'});
    }
}


module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    editar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente,
    editar_perfil_cliente,
    registroDireccion,
    ObtenerDireccion,
    ActualizarDireccionPrincipal
}