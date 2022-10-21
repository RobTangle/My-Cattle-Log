import db from "../../models";
import { checkAnimal } from "../../validators/animal-validators";
import { IAnimal } from "../../types/animal-types";
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

// GET BY ID_SENASA :
router.get("/:id_senasa", async (req, res) => {
  try {
    const { id_senasa } = req.params;
    const foundAnimal: IAnimal = await db.Animal.findByPk(id_senasa);
    if (foundAnimal) {
      return res.status(200).send(foundAnimal);
    } else {
      return res.status(404).send({
        error: `No se encontró ningún registro con el id '${id_senasa}'.`,
      });
    }
  } catch (error: any) {
    console.log(`Error en GET "/:id_senasa". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// POST NEW ANIMAL :
router.post("/", async (req, res) => {
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkAnimal(req.body);
    const newAnimalCreated: IAnimal = await db.Animal.create(
      validatedNewAnimal
    );
    return res.status(200).send({
      msg: `Nuevo animal con id '${newAnimalCreated.id_senasa}' creado.`,
      newAnimal: newAnimalCreated,
    });
  } catch (error: any) {
    console.log(`Error en POST a "animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

// UPDATE ANIMAL :
router.put("/", async (req, res) => {
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedAnimal: IAnimal = checkAnimal(req.body);
    const updatedAnimal = await db.Animal.update(
      { ...validatedAnimal },
      {
        where: {
          id_senasa: validatedAnimal.id_senasa,
        },
      }
    );
    return res.send({
      updated: Number(updatedAnimal[0]),
      msg: `Cantidad de animales actualizados correctamente: ${updatedAnimal[0]}`,
    });
  } catch (error: any) {
    console.log(`Error en PUT "/animal". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
