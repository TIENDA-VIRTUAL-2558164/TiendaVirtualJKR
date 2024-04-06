'use strict'

var espress = require('express');
var DescuentoControler = require('../controllers/descuentoControler');

var api = espress.Router();
var auth = require('../middlewares/authenticate');


module.exports = api;