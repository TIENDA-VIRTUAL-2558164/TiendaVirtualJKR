'use strict'

var espress = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = espress();
require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc'); 
const path = require('path');


const cors = require('cors');
app.use(cors());

var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');
var cupon_route = require('./routes/cupon');
var config_route = require('./routes/config');
var carrito_route = require('./routes/carrito');
var venta_route = require('./routes/venta');
var descuento_route = require('./routes/descuento');

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin : '*'}
});

io.on('connection',function(socket){
    socket.on('deleteCarrito',function(data){
        io.emit('ActCarritoDel',data)
    });

    socket.on('AddCarrito',function(data){
        io.emit('ActCarritoAdd',data)
    })
})

const uri = process.env.DB;

// mongoose.set('useFindAndModify', false);
// console.log(process.env.DB);
// mongoose.connect(process.env.DB,{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
//     if(err){  
//         throw err;
//         console.log(err);
//     }else{
//         console.log("Corriendo....");
//         server.listen(port, function(){
//             console.log("Servidor " + port );
//         });

//     }
// });

// Configuración de Mongoose
mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        console.log("Conectado a MongoDB usando Mongoose.");
        
        // Levantar el servidor Express
        server.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
    }
}

connectToDatabase();


//Documentacion Swagger
const swaggerOptions = {
    definition:{
        openapi:"3.0.0",
        info:{
            version:"1.0.0",
            title: "Docu Api",
            description: "Uso para la Documentacion del Api",
            contact:{
                name:"Tienda JKR"
            },
        },
            servers: [{
                url: process.env.API_URL || 'http://localhost:4201'
            }]
        
    },
    apis:[`${path.join(__dirname, "./routes/*.js")}`]
};




const swaggerDocs = swaggerJsdoc(swaggerOptions); 
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'50mb',extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',cupon_route);
app.use('/api',config_route);
app.use('/api',carrito_route);
app.use('/api',venta_route);
app.use('/api',descuento_route);


module.exports = app;
