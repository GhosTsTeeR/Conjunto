'use strict'
const card = require('../database');


module.exports = function() {

    async function listtarjeta(req) {
        let query = ' SELECT * FROM tbl_tarjetas';

        const data = await card.query(query)
        return data
    }
    async function addtarjeta(req, res){
        await card.query('INSERT INTO tbl_tarjetas set ?', [req.body]);
    }
    async function deletetarjeta(req,  res){
        const {tarjeta} = req.params;
        await card.query('DELETE FROM tbl_tarjetas WHERE tarjeta = ?', [tarjeta]);
    }

    async function modificartarjeta(req,  res){
        const {tarjeta} = req.params;
        await card.query('UPDATE tbl_tarjetas SET ? WHERE tarjeta = ?', [req.body, tarjeta]);
    }
        return {
            listtarjeta,
            addtarjeta,
            deletetarjeta,
            modificartarjeta
        }
}