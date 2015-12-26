var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var accounts = require('./accounts.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
//router.get('/login')
router.post('/login', auth.login);
router.post('/create', user.create);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

router.get('/api/v1/accounts', accounts.getAll);
router.get('/api/v1/account/:id', accounts.getOne);
router.post('/api/v1/account/', accounts.create);
router.put('/api/v1/account/:id', accounts.update);
router.delete('/api/v1/account/:id', accounts.delete);



/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);















module.exports = router;
