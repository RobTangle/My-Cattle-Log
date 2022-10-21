import db from "../../models";
import { IUser } from "../../types/user-types";
import { checkUser } from "../../validators/user-validators";
import { Router } from "express";

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

router.post("/", async (req, res) => {
  try {
    console.log(`REQ.BODY =`);
    console.log(req.body);
    const validatedUser = checkUser(req.body);
    const newUser = await db.User.create(validatedUser);
    console.log(newUser.toJSON());
    return res.status(200).send(newUser);
  } catch (error: any) {
    console.log(`Error en ruta POST "user/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
