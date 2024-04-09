const express = require('express')
const router = express.Router()
const customerController = require('../customerController')
router.get('/customers', customerController.getCustomers);
router.get('/customer/:id', customerController.getCustomerById)
router.get('/customers/uniqueCities', customerController.getCityWithTotalCustomers)
router.post('/addNewCustomer', customerController.addNewCustomer)

module.exports = router;