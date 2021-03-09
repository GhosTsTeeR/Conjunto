const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signUp = require('../Controllers/signUpController');
const pool = require('../database');
const helpers = require('./helpers');  


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const rows = await pool.query("SELECT * FROM tbl_users WHERE username = ?", [username]);

    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(password, user['PASSWORD']);
      console.log(password);
      console.log(user['PASSWORD']);
      console.log(validPassword);
      if (validPassword) {
        done(null, user, req.flash('success', 'Hola ' + user['username']));
      } else {

        done(null, false, req.flash('message', 'Contraseña Incorrecta.'));
      }
    } else {
      return done(null, false, req.flash('message', 'Usuario Incorrecto.'));
    }
  }));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {correo, fk_idRol} =req.body;
    const newUser = {
        username,
        password,
        correo,
        fk_idRol
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO tbl_users set ?', [newUser]);
    newUser.id = result.insertId
    return done(null, newUser);
}));
passport.serializeUser(function(user, done) { done(null, user); }); 
passport.deserializeUser(function(user, done) {
    done(null, user);
  });