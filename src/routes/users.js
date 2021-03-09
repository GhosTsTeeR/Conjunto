const express = require('express');
const router = express.Router();
const crud = require('../Controllers/crudController');
const users = require('../Controllers/userController');
const {isLoggedIn} = require('../lib/auth'); 

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'ghoststeer',
    api_key: '486865968183475',
    api_secret: 'DavS6buaq-ZIepZ_X3eNmXBRmA0'
});
const fs = require('fs-extra'); 


//Zona de usuario

    //inicio
router.get('/inicio', isLoggedIn, async(req, res) => {
    const todaInfoPP = await users.listInfoPP(req.body);
    const todaInfoUser = await users.listInfoUser(req.body);
    res.render('links/users/inicio', {todaInfoPP, todaInfoUser});
});
router.post('/addImgPP', async(req, res)=>{

    await users.addImgPP(req);
    await fs.unlink(req.file.path);
    
    res.redirect('/users/inicio');
});
router.get('/deleteImgPP/:idInformacion', async(req, res)=>{
    await users.deleteImgPP(req);
    res.redirect('/users/inicio');
});
router.post('/modifyImgPP/:idInformacion', async(req, res)=>{
    await users.modifyImgPP(req);
    res.redirect('/users/inicio');
});
    //ventas
router.get('/sale', isLoggedIn, async(req, res) => {
    const todasSales = await users.listSale(req.body);
    const miSale = await users.listSaleI(req.body);
    const todaInfoUser = await users.listInfoUser(req.body);
    res.render('links/users/sale', {miSale, todasSales, todaInfoUser});
    
});
router.post('/addSale', async(req, res)=>{
    await users.addSale(req);
    res.redirect('/users/sale');
});
router.get('/deleteSaleI/:idVenta', async(req, res)=>{
    await users.deleteSaleI(req);
    res.redirect('/users/sale');
});
//permisos
router.post('/addPermisoUsers', async(req, res)=>{
    await users.addPermisos(req);
    res.redirect('/users/inicio');
});
router.get('/deletePermisoUsers/:idPermiso', async(req, res)=>{
    await users.deletePermisos(req);
    res.redirect('/users/inicio');
});
router.post('/modifyPermisoUsers/:idPermiso', async(req, res)=>{
    await users.modifyPermisos(req);
    res.redirect('/users/inicio');
});

    //perfil

        //perfil-information
    router.get('/profile-information',isLoggedIn, async(req, res) => {
        const todaInfoUser = await users.listInfoUser(req.body);
        res.render('links/users/information', {todaInfoUser});
    });
        //perfil-Seguridad
            //informacion
        router.get('/profile-security-information',isLoggedIn, async(req, res) => {
            const todasTarjetas = await crud.listtarjeta(req.body);
            res.render('links/users/security/information', {todasTarjetas});
        });
            //quejas
        router.get('/profile-security-claims', isLoggedIn, async(req, res) => {
            const todasQuejas = await users.listClaims(req.body);
            res.render('links/users/security/claims', {todasQuejas});
        });
            //alertas
        router.get('/profile-security-alerts', isLoggedIn, async(req, res) => {
            const todasTarjetas = await crud.listtarjeta(req.body);
            res.render('links/users/security/alerts');
        });

        //perfil-Integrantes
        router.get('/profile-information',isLoggedIn, async(req, res) => {

            res.render('links/users/perfil');
        });
// Mensajes

router.get('/messages/andres-propietario', isLoggedIn, async(req, res) => {
    const todosMensajes = await users.listChat(req.body);
    res.render('links/users/messages', {todosMensajes});
});
router.post('/addMessage', async(req, res)=>{
    await users.addMessage(req);
    res.redirect('/users/messages/andres-propietario');
});

router.get('/members', isLoggedIn, async(req, res) => {
    const todosPP = await users.lsitPermisosPropietario(req.body);
    const todosPS = await users.lsitPermisosSeguridad(req.body);
    res.render('links/users/members', {todosPP,todosPS});
});

module.exports = router;
