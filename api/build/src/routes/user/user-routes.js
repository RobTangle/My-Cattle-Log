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
const user_validators_1 = require("../../validators/user-validators");
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET ALL USERS :
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUserFromDB = yield models_1.default.User.findAll();
        return res.status(200).send(allUserFromDB);
    }
    catch (error) {
        console.log(`Error en ruta GET "user/". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
// POST NEW USER
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`REQ.BODY =`);
        console.log(req.body);
        const validatedUser = (0, user_validators_1.checkUser)(req.body);
        const newUser = yield models_1.default.User.create(validatedUser);
        console.log(newUser.toJSON());
        return res.status(200).send(newUser);
    }
    catch (error) {
        console.log(`Error en ruta POST "user/". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
