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
const express_1 = require("express");
const router = (0, express_1.Router)();
// ------- RUTAS : ---------
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`REQ.BODY = `);
        console.log(req.body);
        return res.status(200).send({ msg: "POST recibido", body: req.body });
    }
    catch (error) {
        console.log(`Error en POST a "animal/". ${error.message}`);
        return res.send({ error: error.message });
    }
}));
exports.default = router;
