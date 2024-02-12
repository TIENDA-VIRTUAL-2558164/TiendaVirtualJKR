'use strict'

var espress = require('express');
var adminControler = require('../controllers/AdminControler');

var api = espress.Router();

api.post('/registro_admin',adminControler.registro_admin);
api.post('/login_admin', adminControler.login_admin);

module.exports = api;