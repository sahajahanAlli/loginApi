var express = require('express');

var approuter = express.Router();

approuter.post('/login', require('../validationlayer/auth').login);
approuter.all('/v1/*', require('../validationlayer/auth').validateToken);
approuter.get('/v1/products', require('../api/model/products').getPoduct)
approuter.post('/v1/products', require('../api/model/products').addProduct)
approuter.post('/register', require('../api/model/user.model').addUser)
    /*approuter.delete('/v1/products', )
     */
approuter.get('/v1/weather', require('../api/controller/weather').getWeatherFun)

module.exports = approuter;