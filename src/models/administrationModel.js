'use strict'
const info = require('../database');


module.exports = function() {


    async function listRol(req, res){
        let query = ' SELECT * FROM tbl_rol';

        const data = await info.query(query)
        return data
    }

        return {
            listRol
        }
}