const express = require('express');
const router = express.Router();
const crud = require('../Controllers/crudController');
const users = require('../Controllers/userController');
/* const passport = require('../lib/passport'); */
const passport = require('passport');



router.get('/inicio',async(req, res) => {
    
    const todasTarjetas = await crud.listtarjeta(req.body);
    res.render('crud', { todasTarjetas });
});

router.post('/addtarjeta', async(req, res)=>{
    await crud.addtarjeta(req);
    req.flash('success', 'Tarjeta añadida correctamente');
    res.redirect('/links/inicio');
});
router.get('/deletetarjeta/:tarjeta', async(req, res)=>{
    await crud.deletetarjeta(req);
    req.flash('success', 'Tarjeta Eliminada correctamente');
    res.redirect('/links/inicio');
});
router.post('/modificartarjeta/:tarjeta', async(req, res)=>{
    await crud.modificartarjeta(req);
    req.flash('success', 'Tarjeta modificada correctamente');
    res.redirect('/links/inicio');
});

//Zona de usuario

    //inicio
router.get('/beginning',async(req, res) => {
    
    const todosPermisos = await users.listPermisos(req.body);
    const todasTarjetas = await crud.listtarjeta(req.body);
    res.render('links/users/inicio', { todosPermisos, todasTarjetas });
});
router.post('/addPermisoUsers', async(req, res)=>{
    await users.addPermisos(req);
    res.redirect('/links/beginning');
});
router.get('/deletePermisoUsers/:idPermiso', async(req, res)=>{
    await users.deletePermisos(req);
    res.redirect('/links/beginning');
});
router.post('/modifyPermisoUsers/:idPermiso', async(req, res)=>{
    await users.modifyPermisos(req);
    res.redirect('/links/beginning');
});

    //ventas
router.get('/sale',async(req, res) => {
    const todasSales = await users.listSale(req.body);
    res.render('links/users/sale', {todasSales});
    
});
    //perfil

        //perfil-information
    router.get('/profile-information',async(req, res) => {

        res.render('links/users/perfil');
    });
        //perfil-Seguridad
            //informacion
        router.get('/profile-security-information',async(req, res) => {
            const todasTarjetas = await crud.listtarjeta(req.body);
            res.render('links/users/security/information', {todasTarjetas});
        });
            //quejas
        router.get('/profile-security-claims',async(req, res) => {
            const todasQuejas = await users.listClaims(req.body);
            res.render('links/users/security/claims', {todasQuejas});
        });
            //alertas
        router.get('/profile-security-alerts',async(req, res) => {
            const todasTarjetas = await crud.listtarjeta(req.body);
            res.render('links/users/security/alerts');
        });

        //perfil-Integrantes
    router.get('/profile-information',async(req, res) => {

        res.render('links/users/perfil');
    });

//Zona de administracion

router.get('/signUP',async(req, res) => {
    res.render('links/administration/signup');
});
/* router.post('/signUp', async(req, res)=>{
    passport.authenticate('local.singup', {
        successRedirect: '/links/userInicio',
        failureRedirect: '/links/signUP',
        failureFlash: true
    });
}); */
router.post('/signUp', passport.authenticate('local.signup', {
        successRedirect: '/links/userInicio',
        failureRedirect: '/links/signUP',
        failureFlash: true

}));



module.exports = router;
