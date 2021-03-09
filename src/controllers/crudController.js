'use strict'
const card = require('../models/crudModel');

async function listtarjeta(req = null) {
    const listtarjeta = await card().listtarjeta(req)
    return listtarjeta

}
async function addtarjeta(req = null){
    const addtarjeta= await card().addtarjeta(req)
    return addtarjeta
}
async function deletetarjeta(req = null){
    const deletetarjeta = await card().deletetarjeta(req)
    return deletetarjeta
}
async function modificartarjeta(req = null){
    const modificartarjeta = await card().modificartarjeta(req)
    return modificartarjeta
}
module.exports = {
    listtarjeta,
    addtarjeta,
    deletetarjeta,
    modificartarjeta
    
 
}
