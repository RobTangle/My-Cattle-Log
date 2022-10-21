import db from "../../models";
import { checkNewAnimal } from "../../validators/animal-validators";
import { Router } from "express";
const router = Router();

// ------- RUTAS : ---------

// GET ALL FROM ANIMALS :
router.get("/", async (req, res) => {
  try {
    const allAnimalsFromDB = await db.Animal.findAll();
    return res.status(200).send(allAnimalsFromDB);
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

// POST NEW ANIMAL :
router.post("/", async (req, res) => {
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkNewAnimal(req.body);
    const newAnimalCreated = await db.Animal.create(validatedNewAnimal);
    return res.status(200).send({
      msg: `Nuevo animal con id '${newAnimalCreated.id_senasa}' creado.`,
      newAnimal: newAnimalCreated,
    });
  } catch (error: any) {
    console.log(`Error en POST a "animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

export default router;
