"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = exports.checkUser = void 0;
const generic_validators_1 = require("./generic-validators");
function checkUser(idFromReq, nameFromReq, emailFromReq) {
    console.log(`Checking User...`);
    try {
        const checkedUser = {
            id: checkUserId(idFromReq),
            name: checkUserName(nameFromReq),
            email: checkEmail(emailFromReq),
        };
        return checkedUser;
    }
    catch (error) {
        console.log(`Error en fn checkUser. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.checkUser = checkUser;
// CHECK USER ID :
function checkUserId(idFromReq) {
    if ((0, generic_validators_1.isStringBetween1And101CharsLong)(idFromReq)) {
        return idFromReq;
    }
    else {
        throw new Error(`Invalid user id`);
    }
}
function checkUserName(nameFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(nameFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(nameFromReq)) {
        return nameFromReq;
    }
    else {
        throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
    }
}
//CHECK VALID EMAIL
function checkEmail(emailFromReq) {
    if ((0, generic_validators_1.isEmail)(emailFromReq)) {
        return emailFromReq;
    }
    throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}
exports.checkEmail = checkEmail;
