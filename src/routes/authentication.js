const express= require('express');
const router= express.Router();
const permisoUser = require('../Controllers/userController');
/* const passport = require('../lib/passport'); */
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

//la encontraras en administracion (links)
// crear una cuenta
router.get('/signUP', async(req, res) => {
    res.render('links/administration/signUp');
});
/* router.post('/signUp', async(req, res)=>{
    passport.authenticate('local.singup', {
        successRedirect: '/links/userInicio',
        failureRedirect: '/links/signUP',
        failureFlash: true
    });
}); */
router.post('/signUp', passport.authenticate('local.signup', {
        successRedirect: '/administration/signup',
        failureRedirect: '/administration/signup',
        failureFlash: true

}));


//iniciar sesion
router.get('/signIn', isNotLoggedIn, async(req, res) => {
    res.render('auth/signin');
});
router.post('/signIn', (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/users/inicio',
        failureRedirect: '/signIn',
        failureFlash: true
    })(req, res, next);
});


//Cerrar Sesion
router.get('/logout', isLoggedIn, async(req, res) => {
    req.logOut();
    res.redirect('/signin');
});



module.exports = router;

