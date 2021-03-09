const express = require('express');
const router = express.Router();
const passport = require('passport');
const admin = require('../Controllers/administrationController');


//Zona de agregado de usuario

router.get('/signup',async(req, res) => {
   
    const todosRoles = await admin.listRol(req.body);
    res.render('links/administration/signup', {todosRoles});

});
/* router.post('/signUp', async(req, res)=>{
    passport.authenticate('local.singup', {
        successRedirect: '/links/userInicio',
        failureRedirect: '/links/signUP',
        failureFlash: true
    });
}); */
router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/administration/signup',
        failureRedirect: '/administration/signup',
        failureFlash: true

}));




module.exports = router;
