'use strict'
const info = require('../models/usersModel');

// Listar informacion del usuario
async function listInfoUser(req = null) {
    const listInfoUser = await info().listInfoUser(req)
    return listInfoUser
}
//informacion PP
async function listInfoPP(req = null) {
    const listInfoPP = await info().listInfoPP(req)
    return listInfoPP
}

async function addImgPP(req = null) {
    const addImgPP= await info().addImgPP(req)
    return addImgPP
}
async function modifyPermisos(req = null){
    const modifyPermisos = await info().modifyPermisos(req)
    return modifyPermisos
}
async function deleteImgPP(req = null){
    const deleteImgPP = await info().deleteImgPP(req)
    return deleteImgPP
}
async function modifyImgPP(req = null){
    const modifyImgPP = await info().modifyImgPP(req)
    return modifyImgPP
}
//ventas de casas
async function listSaleI(req = null) {
    const listSaleI = await info().listSaleI(req)
    return listSaleI
}
async function listSale(req = null) {
    const listSale = await info().listSale(req)
    return listSale
}
async function addSale(req = null){
    const addSale= await info().addSale(req)
    return addSale
}
async function deleteSaleI(req = null){
    const deleteSaleI = await info().deleteSaleI(req)
    return deleteSaleI
}
//Chat
async function listChat(req = null) {
    const listChat = await info().listChat(req)
    return listChat
}
async function addMessage(req = null){
    const addMessage= await info().addMessage(req)
    return addMessage
}
//permisos
async function lsitPermisosSeguridad(req = null) {
    const lsitPermisosSeguridad = await info().lsitPermisosSeguridad(req)
    return lsitPermisosSeguridad
}
async function lsitPermisosPropietario(req = null) {
    const lsitPermisosPropietario = await info().lsitPermisosPropietario(req)
    return lsitPermisosPropietario
}
async function addPermisos(req = null){
    const addPermisos= await info().addPermisos(req)
    return addPermisos
}
async function deletePermisos(req = null){
    const deletePermisos = await info().deletePermisos(req)
    return deletePermisos
}
async function modifyPermisos(req = null){
    const modifyPermisos = await info().modifyPermisos(req)
    return modifyPermisos
}
//Quejas y reclamos
async function listClaims(req = null) {
    const listClaims = await info().listClaims(req)
    return listClaims
}


module.exports = {
    //Informacion del Usuario
    listInfoUser,
    //informacion PP
    listInfoPP,
    addImgPP,
    deleteImgPP,
    modifyImgPP,
    //Permisos
    lsitPermisosSeguridad,
    lsitPermisosPropietario,
    addPermisos,
    deletePermisos,
    modifyPermisos,
    //ventas de casas
    listSale,
    listSaleI,
    addSale,
    deleteSaleI,
    //chat
    listChat,
    addMessage,
    //Quejas y reclamos
    listClaims
 
}
