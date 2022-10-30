"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const animal_validators_1 = require("../../validators/animal-validators");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const sequelize_1 = require("sequelize");
const animal_r_auxiliary_1 = require("./animal-r-auxiliary");
const router = (0, express_1.Router)();
// ------- RUTAS : ---------
// GET ALL FROM ANIMALS :
router.get("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        const allAnimalsFromDB = yield models_1.default.Animal.findAll({
            where: {
                UserId: userId,
            },
        });
        return res.status(200).send(allAnimalsFromDB);
    }
    catch (error) {
        console.log(`Error en "/animal/". ${error.message}`);
        return res.send({ error: error.message });
    }
}));
// SEARCH BY QUERY :
router.get("/search", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Buscando por query...`);
        console.log(req.query);
        let queryValue = req.query.value;
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        if (typeof queryValue === "string") {
            queryValue.toLowerCase();
        }
        const searchedResults = yield models_1.default.Animal.findAll({
            where: {
                [sequelize_1.Op.or]: [{ id_senasa: queryValue }, { name: queryValue }],
                UserId: userId,
            },
        });
        console.log(`Largo de searchedResults = ${searchedResults === null || searchedResults === void 0 ? void 0 : searchedResults.length}`);
        return res.status(200).send(searchedResults);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
// GET BY ID_SENASA :
router.get("/id/:id_senasa", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_senasa } = req.params;
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        //Chequear si este where está bien puesto:
        const foundAnimal = yield models_1.default.Animal.findOne({
            where: {
                id_senasa: id_senasa,
                UserId: userId,
            },
        });
        if (foundAnimal) {
            return res.status(200).send(foundAnimal);
        }
        else {
            return res.status(404).send({
                error: `No se encontró ningún registro con el id '${id_senasa}'.`,
            });
        }
    }
    catch (error) {
        console.log(`Error en GET "/:id_senasa". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// POST NEW ANIMAL JWTCHECK:
router.post("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        // let userIsRegistered = await userIsRegisteredInDB(userId);
        // if (userIsRegistered !== true) {
        //   throw new Error(`No se encontró al usuario registrado en la DB`);
        // }
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const validatedNewAnimal = (0, animal_validators_1.checkAnimal)(req.body);
        const newAnimalCreated = yield models_1.default.Animal.create(validatedNewAnimal);
        yield newAnimalCreated.setUser(userId);
        console.log(`nuevo animal creado y asociado al usuario con id ${userId}`);
        return res
            .status(200)
            .send({ msg: "Animal creado correctamente.", animal: newAnimalCreated });
    }
    catch (error) {
        console.log(`Error en POST 'user/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// UPDATE ANIMAL :
router.put("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        // let userIsRegistered = await userIsRegisteredInDB(userId);
        // if (userIsRegistered !== true) {
        //   throw new Error(`No se encontró al usuario registrado en la DB`);
        // }
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const validatedAnimal = (0, animal_validators_1.checkAnimal)(req.body);
        const updatedAnimal = yield models_1.default.Animal.update(Object.assign({}, validatedAnimal), {
            where: {
                id_senasa: validatedAnimal.id_senasa,
                UserId: userId,
            },
        });
        console.log(`Animal actualizado. Retornando respuesta...`);
        return res.send({
            updated: Number(updatedAnimal[0]),
            msg: `Cantidad de animales actualizados correctamente: ${updatedAnimal[0]}`,
        });
    }
    catch (error) {
        console.log(`Error en PUT "/animal". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// DELETE ANIMAL :
router.delete("/delete/:id_senasa", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`En delete por id...`);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        const id_senasaFromParams = req.params.id_senasa;
        if (!id_senasaFromParams) {
            throw new Error(`El id de senasa no puede ser falso.`);
        }
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        let deletedAnimal = yield models_1.default.Animal.destroy({
            where: {
                id_senasa: id_senasaFromParams,
                UserId: userId,
            },
        });
        console.log(deletedAnimal);
        return res.status(200).send({
            msg: `${deletedAnimal} Animal destruido suavemente`,
            deletedAnimal: deletedAnimal,
        });
    }
    catch (error) {
        console.log(`Error en DELETE por id. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// GET TYPES OF ANIMAL ACCEPTED :
router.get("/typesAllowed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Types of animals allowed: `);
        let typesOfAnimalsArray = (0, animal_r_auxiliary_1.typesOfAnimalsToArray)();
        console.log(typesOfAnimalsArray);
        return res.status(200).send(typesOfAnimalsArray);
    }
    catch (error) {
        console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
