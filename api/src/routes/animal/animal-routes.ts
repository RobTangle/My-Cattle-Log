import db from "../../models";
import { checkAnimal } from "../../validators/animal-validators";
import { IAnimal } from "../../types/animal-types";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { userIsRegisteredInDB } from "../user/user-r-auxiliary";
const router = Router();

// ------- RUTAS : ---------

// GET ALL FROM ANIMALS :
router.get("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;

    const allAnimalsFromDB = await db.Animal.findAll({
      where: {
        UserId: userId,
      },
    });
    return res.status(200).send(allAnimalsFromDB);
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

// GET BY ID_SENASA :
router.get("/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const { id_senasa } = req.params;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    //Chequear si este where está bien puesto:
    const foundAnimal: IAnimal = await db.Animal.findOne({
      where: {
        id_senasa: id_senasa,
        UserId: userId,
      },
    });
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

// POST NEW ANIMAL JWTCHECK:
router.post("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    let userIsRegistered = await userIsRegisteredInDB(userId);
    if (userIsRegistered !== true) {
      throw new Error(`No se encontró al usuario registrado en la DB`);
    }
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkAnimal(req.body);
    const newAnimalCreated = await db.Animal.create(validatedNewAnimal);
    await newAnimalCreated.setUser(userId);
    console.log(`nuevo animal creado y asociado al usuario con id ${userId}`);
    return res.status(200).send(newAnimalCreated);
  } catch (error: any) {
    console.log(`Error en POST 'user/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
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
