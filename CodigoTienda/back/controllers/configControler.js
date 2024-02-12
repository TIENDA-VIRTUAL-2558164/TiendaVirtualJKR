"use strict";

const Config = require("../models/config");
let fs = require('fs');
let path = require('path');

const actualizar_config = async function (req, res) {
   if (req.user) {
      if (req.user.role == "admin") {

         let data = req.body;
         let id = "65636fcf2703f53318a18ab1";

         if (req.files) {

            //console.log("si img");

            //si hay imagen
            var img_path = req.files.logo.path;
            var name = img_path.split("\\");
            var logo_name = name[2];

            let reg = await Config.findByIdAndUpdate(
               { _id: id },
               {
                  categorias: JSON.parse(data.categorias),
                  razonsocial: data.razonsocial,
                  serie: data.serie,
                  correlativo: data.correlativo,
                  logo: logo_name
               }
            );
            fs.stat("./uploads/configuraciones/" + reg.logo, function (err) {
               if (!err) {
                  fs.unlink("./uploads/configuraciones/" + reg.logo, (err) => {
                     if (err) throw err;
                  });
               }
            });

            res.status(200).send({ data: reg });
         } else {

            //console.log("no img");

            let reg = await Config.findByIdAndUpdate(
               { _id: id },
               {
                  categorias: data.categorias,
                  razonsocial: data.razonsocial,
                  serie: data.serie,
                  correlativo: data.correlativo,
               }
            );
            res.status(200).send({ data: reg });
         }
      } else {
         res.status(500).send({ message: "NoAcces" });
      }
   } else {
      res.status(500).send({ message: "NoAcces" });
   }
}

const obtener_config = async function (req,res) {
   if (req.user) {
      if (req.user.role == "admin") {

         let id = "65636fcf2703f53318a18ab1";
         let reg = await Config.findById({_id:id});

         res.status(200).send({data:reg});

      } else {
         res.status(500).send({ message: "NoAcces" });
      }
   } else {
      res.status(500).send({ message: "NoAcces" });
   }
}

const obtener_img = async function (req,res) {
   let img = req.params['img'];
   fs.stat('./uploads/configuraciones/'+img, function(err){

       if (!err) {
           let path_img = './uploads/configuraciones/'+img;
           res.status(200).sendFile(path.resolve(path_img));
       }else{
           let path_img = './uploads/default.jpg';
           res.status(200).sendFile(path.resolve(path_img));
       }
   });
}

const obtener_config_publico = async function (req,res) {

         let id = "65636fcf2703f53318a18ab1";
         let reg = await Config.findById({_id:id});
         res.status(200).send({data:reg});
      
}
module.exports = {
   actualizar_config,
   obtener_config,
   obtener_img,
   obtener_config_publico
};
