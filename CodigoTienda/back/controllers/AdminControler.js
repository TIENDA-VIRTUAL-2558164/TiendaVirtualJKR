'use strict'

const admin = require('../models/admin');
var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');



const registro_admin = async function(req,res){

    var data = req.body;
    var admin_arr = [];
    
    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
        
        //registro
        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var reg = await Admin.create(data);
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

const login_admin = async function(req,res){

    var data = req.body;
    var Admin_arr = [];


    Admin_arr = await admin.find({email: data.email});

    if(Admin_arr.length == 0){
        res.status(200).send({message:'No se encontro el usuario', data:undefined});
    }else{
        let user = Admin_arr[0];

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

const ListarAdmins = async function (req, res) {
    
    if (req.user) {
        
            let reg = await Admin.find();
            res.status(200).send({data:reg})

    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    registro_admin,
    login_admin,
    ListarAdmins
}