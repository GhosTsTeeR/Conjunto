'use strict'
const info = require('../models/signUpModel');

async function signUp(req = null){
    const signUp= await info().signUp(req)
    return signUp
}
module.exports = {
    signUp
}
