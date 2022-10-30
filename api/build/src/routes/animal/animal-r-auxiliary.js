"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesOfAnimalsToArray = void 0;
const animal_types_1 = require("../../types/animal-types");
function typesOfAnimalsToArray() {
    try {
        let typesParsedToArray = Object.values(animal_types_1.ITypeOfAnimal);
        return typesParsedToArray;
    }
    catch (error) {
        console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.typesOfAnimalsToArray = typesOfAnimalsToArray;
