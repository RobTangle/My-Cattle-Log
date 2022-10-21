import db from "../../models";
import { IAnimal, ITypeOfAnimal } from "../../types/animal-types";

import { Router } from "express";

const router = Router();

// ------- RUTAS : ---------

router.get("/", async (req, res) => {
  try {
    const allAnimalsFromDB = await db.Animal.findAll();
    return res.status(200).send(allAnimalsFromDB);
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);
    return res.status(200).send({ msg: "POST recibido", body: req.body });
  } catch (error: any) {
    console.log(`Error en POST a "animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

export default router;
