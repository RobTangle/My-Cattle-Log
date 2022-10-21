"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTypeOfAnimal = exports.checkAnimal = void 0;
const animal_types_1 = require("../types/animal-types");
const generic_validators_1 = require("./generic-validators");
// CHECK ANIMAL :
// This function is the main function that validates the data recived in the request for a POST of a new animal or a PUT for updating an Animal.
// It uses many other auxiliary functions to make sure all the data from the request is valid before trying to store a new instance of Animal in the Data Base.
function checkAnimal(bodyFromReq) {
    try {
        console.log(`Checking Animal...`);
        const checkedAnimal = {
            id_senasa: checkId(bodyFromReq.id_senasa),
            type_of_animal: checkTypeOfAnimal(bodyFromReq.type_of_animal),
            weight_kg: checkWeight(bodyFromReq.weight_kg),
            name: checkName(bodyFromReq.name),
            device_type: checkDeviceType(bodyFromReq.device_type),
            device_number: checkDeviceNumber(bodyFromReq.device_number),
        };
        return checkedAnimal;
    }
    catch (error) {
        console.log(`Error en fn checkNewAnimal. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.checkAnimal = checkAnimal;
// CHECK DEVICE_TYPE:
function checkDeviceType(argFromReq) {
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`The device_type "${argFromReq}" is invalid.`);
    }
}
// CHECK DEVICE_NUMBER:
function checkDeviceNumber(argFromReq) {
    if ((0, generic_validators_1.isStringXCharsLong)(8, argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`The device_number "${argFromReq}" is invalid.`);
    }
}
// CHECK ID_SENASA:
function checkId(idFromReq) {
    if ((0, generic_validators_1.isValidSenasaId)(idFromReq)) {
        return idFromReq;
    }
    else {
        throw new Error(`The id_senasa "${idFromReq}" is invalid.`);
    }
}
// CHECK TYPE OF ANIMAL:
function isValidTypeOfAnimal(argument) {
    return Object.values(animal_types_1.ITypeOfAnimal).includes(argument);
}
exports.isValidTypeOfAnimal = isValidTypeOfAnimal;
function checkTypeOfAnimal(argFromReq) {
    if (isValidTypeOfAnimal(argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`The type_of_animal "${argFromReq}" is invalid.`);
    }
}
// CHECK WEIGHT_KG:
function checkWeight(argFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(argFromReq)) {
        return undefined;
    }
    let parsedArg = Math.round(Number(argFromReq));
    if (parsedArg && typeof parsedArg === "number" && parsedArg > 0) {
        return parsedArg;
    }
    throw new Error(`The weight_kg "${argFromReq}" is invalid.`);
}
// CHECK NAME:
function checkName(argFromReq) {
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(200, argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`The name "${argFromReq}" es invalid.`);
    }
}
