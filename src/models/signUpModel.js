'use strict'
const info = require('../database');


module.exports = function() {


    async function signUp(req, res){
        await info.query('INSERT INTO tbl_usuarios set ?', [req.body]);
    }

        return {
            signUp
        }
}