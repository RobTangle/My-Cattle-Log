"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const test_1 = __importDefault(require("./routes/test"));
const animal_routes_1 = __importDefault(require("./routes/animal/animal-routes"));
const user_routes_1 = __importDefault(require("./routes/user/user-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(morgan("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/test", test_1.default);
app.use("/animal", animal_routes_1.default);
app.use("/user", user_routes_1.default);
app.get("/", (req, res) => {
    return res.send("HOLA!!!!!!! AA!!");
});
module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
