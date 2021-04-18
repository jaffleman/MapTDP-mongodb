const express = require('express')
const tdp = require('../controler/tdp_controler')
const routes = express.Router()

routes.post('/search', tdp.search) 
routes.post('/searchRep', tdp.searchRep)
routes.post('/create', tdp.create)
routes.put('/update', tdp.update)
routes.delete('/delete', tdp.delete)
routes.get('/updateid', tdp.updateid)
module.exports = routes;
