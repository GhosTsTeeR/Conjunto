'use strict'
const info = require('../models/administrationModel');

async function listRol(req = null){
    const listRol= await info().listRol(req)
    return listRol
}
module.exports = {
    listRol
}
