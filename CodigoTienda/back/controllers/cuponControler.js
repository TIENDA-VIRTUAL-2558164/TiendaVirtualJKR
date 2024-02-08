var Cupon = require('../models/cupon');

const registro_cupon_admin = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;
            
            let reg = await Cupon.create(data);
            res.status(200).send({data:reg});

        } else {
            res.status(500).send({message:'NoAcces'});    
        }
        
    } else {
        res.status(500).send({message:'NoAcces'});
    }
    
}

const listar_cupones = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            let filtro = req.params['filtro'];

            if (filtro == null || filtro == "null") {

               let reg = await Cupon.find();
               res.status(200).send({ data: reg });

            } else {

                let reg = await Cupon.find({codigo:new RegExp(filtro,'i')}).sort({createdAt: -1});
                res.status(200).send({data:reg});

            }

        } else {
            res.status(500).send({message: 'NoAccess'})
        }
        
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
    
}

const obtener_cupon = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            let id = req.params['id'];

            try {
                
                let reg = await Cupon.findById({_id:id});
                res.status(200).send({data:reg});


            } catch (error) {
                res.status(200).send({data:undefined});
            }


        } else {
            res.status(500).send({message:'NoAccess'});
        }
    } else {
        res.status(500).send({message:'NoAccess'});
    }
    
}

const editar_cupon = async function (req,res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            
            let id = req.params['id'];
            let data = req.body;

            let reg = await Cupon.findByIdAndUpdate({_id:id},{
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            });

            res.status(200).send({data:reg});

        } else {
            res.status(500).send({message:'NoAccess'});
        }
    } else {
        res.status(500).send({message:'NoAccess'});
    }
    
}

const eliminar_cupon = async function (req,res){
    if (req.user) {
        if (req.user.role == "admin") {

            let id = req.params['id'];

            let reg = await Cupon.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});


        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    registro_cupon_admin,
    listar_cupones,
    obtener_cupon,
    editar_cupon,
    eliminar_cupon
}