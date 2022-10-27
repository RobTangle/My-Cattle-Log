import db from "../../models";
import { IReqAuth, IUser } from "../../types/user-types";
import { checkUser } from "../../validators/user-validators";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import {
  emailExistsInDataBase,
  userIsRegisteredInDB,
} from "./user-r-auxiliary";

const router = Router();

// GET ALL USERS :
router.get("/", async (req, res) => {
  try {
    const allUserFromDB = await db.User.findAll();
    return res.status(200).send(allUserFromDB);
  } catch (error: any) {
    console.log(`Error en ruta GET "user/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// POST NEW USER
router.post("/register", jwtCheck, async (req: any, res) => {
  try {
    console.log(`REQ.BODY =`);
    console.log(req.body);
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    const { name, email } = req.body;
    await emailExistsInDataBase(email);
    const validatedUser: IUser = checkUser(userId, name, email);
    const newUser = await db.User.create(validatedUser);
    console.log(newUser.toJSON());
    return res.status(200).send(newUser);
  } catch (error: any) {
    console.log(`Error en ruta POST "user/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/existsInDB", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    const isUserRegisteredinDB = await userIsRegisteredInDB(userId);
    if (isUserRegisteredinDB) {
      return res.status(200).send({ msg: true });
    }
    if (!isUserRegisteredinDB) {
      console.log(`Usuario no encontrado en la DB.`);
      return res.status(200).send({ msg: false });
    }
  } catch (error: any) {
    console.log(`Error en GET "/user/existsInDB. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
