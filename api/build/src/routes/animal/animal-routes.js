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
const express_1 = require("express");
const router = (0, express_1.Router)();
// ------- RUTAS : ---------
// GET ALL FROM ANIMALS :
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAnimalsFromDB = yield models_1.default.Animal.findAll();
        return res.status(200).send(allAnimalsFromDB);
    }
    catch (error) {
        console.log(`Error en "/animal/". ${error.message}`);
        return res.send({ error: error.message });
    }
}));
// GET BY ID_SENASA :
router.get("/:id_senasa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_senasa } = req.params;
        const foundAnimal = yield models_1.default.Animal.findByPk(id_senasa);
        if (foundAnimal) {
            return res.status(200).send(foundAnimal);
        }
        else {
            return res
                .status(404)
                .send({
                error: `No se encontró ningún registro con el id '${id_senasa}'.`,
            });
        }
    }
    catch (error) {
        console.log(`Error en GET "/:id_senasa". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// POST NEW ANIMAL :
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const validatedNewAnimal = (0, animal_validators_1.checkAnimal)(req.body);
        const newAnimalCreated = yield models_1.default.Animal.create(validatedNewAnimal);
        return res.status(200).send({
            msg: `Nuevo animal con id '${newAnimalCreated.id_senasa}' creado.`,
            newAnimal: newAnimalCreated,
        });
    }
    catch (error) {
        console.log(`Error en POST a "animal/". ${error.message}`);
        return res.send({ error: error.message });
    }
}));
// UPDATE ANIMAL :
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const validatedAnimal = (0, animal_validators_1.checkAnimal)(req.body);
        const updatedAnimal = yield models_1.default.Animal.update(Object.assign({}, validatedAnimal), {
            where: {
                id_senasa: validatedAnimal.id_senasa,
            },
        });
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
exports.default = router;
