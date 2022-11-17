import db from "../../models";
import { checkAnimal } from "../../validators/animal-validators";
import { IAnimal } from "../../types/animal-types";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { throwErrorIfUserIsNotRegisteredInDB } from "../user/user-r-auxiliary";
import { Op } from "sequelize";
import {
  getAndParseIsPregnantQuery,
  getObjOfAllAnimalsAndCount,
  getObjOfAnimalsByDeviceType,
  getObjOfAnimalsByLocation,
  getObjOfAnimalsByRace,
  getObjOfAnimalsBySex,
  getObjOfAnimalsByTypeOfAnimal,
  getObjOfAnimalsNotPregnant,
  getObjOfAnimalsPregnant,
  typesOfAnimalsToArray,
} from "./animal-r-auxiliary";
import { stringToBoolean } from "../../validators/generic-validators";

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

// SEARCH BY QUERY :
router.get("/search", jwtCheck, async (req: any, res) => {
  try {
    let queryValue = req.query.value;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);

    const searchedResults: IAnimal[] = await db.Animal.findAll({
      where: {
        [Op.or]: [
          { id_senasa: { [Op.iLike]: queryValue } },
          { name: { [Op.iLike]: queryValue } },
          { device_number: { [Op.iLike]: queryValue } },
        ],
        UserId: userId,
      },
    });

    return res.status(200).send(searchedResults);
  } catch (error: any) {
    console.log(`Error en "/search". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET BY ID_SENASA :
router.get("/id/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const { id_senasa } = req.params;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
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
    await throwErrorIfUserIsNotRegisteredInDB(userId);

    const validatedNewAnimal = checkAnimal(req.body);
    const newAnimalCreated = await db.Animal.create(validatedNewAnimal);
    await newAnimalCreated.setUser(userId);
    return res
      .status(200)
      .send({ msg: "Animal creado correctamente.", animal: newAnimalCreated });
  } catch (error: any) {
    console.log(`Error en POST 'user/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// UPDATE ANIMAL :
router.put("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;

    await throwErrorIfUserIsNotRegisteredInDB(userId);

    const validatedAnimal: IAnimal = checkAnimal(req.body);
    const updatedAnimal = await db.Animal.update(
      { ...validatedAnimal },
      {
        where: {
          id_senasa: validatedAnimal.id_senasa,
          UserId: userId,
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

// DELETE ANIMAL :
router.delete("/delete/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    const id_senasaFromParams = req.params.id_senasa;
    if (!id_senasaFromParams) {
      throw new Error(`El id de senasa no puede ser falso.`);
    }
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    let deletedAnimal = await db.Animal.destroy({
      where: {
        id_senasa: id_senasaFromParams,
        UserId: userId,
      },
    });

    return res.status(200).send({
      msg: `${deletedAnimal} Animal destruido suavemente`,
      deletedAnimal: deletedAnimal,
    });
  } catch (error: any) {
    console.log(`Error en DELETE por id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET TYPES OF ANIMAL ACCEPTED :
router.get("/typesAllowed", async (req, res) => {
  try {
    let typesOfAnimalsArray = typesOfAnimalsToArray();
    return res.status(200).send(typesOfAnimalsArray);
  } catch (error: any) {
    console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

//! PARSED FOR STATS: ------------------
// GET ALL IS PREGNANT TRUE || FALSE & ORDERED BY DELIVERY DATE :
//Ruta de ejemplo:  localhost:3001/animal/isPregnant?status=true&order=ASC
router.get("/isPregnant", jwtCheck, async (req: any, res) => {
  try {
    // espero req.query.status = true || false
    //URL Ej:  /animal/isPregnant?status=true || false
    console.log(req.query);
    console.log("req.query.status = ", req.query.status);
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    let status = req.query.status;
    let statusParsed: boolean = stringToBoolean(status);
    let order = req.query.order; // ASC || DESC || NULLS FIRST

    const querySearchResult = await getAndParseIsPregnantQuery(
      userId,
      statusParsed,
      order
    );
    return res.status(200).send(querySearchResult);
  } catch (error: any) {
    console.log(`Error en '/animal/isPregnant. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/stats", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    let stats = {
      allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
      deviceType: await getObjOfAnimalsByDeviceType(userId),
      location: await getObjOfAnimalsByLocation(userId),
      races: await getObjOfAnimalsByRace(userId),
      pregnant: await getObjOfAnimalsPregnant(userId),
      notPregnant: await getObjOfAnimalsNotPregnant(userId),
      types: await getObjOfAnimalsByTypeOfAnimal(userId),
      sex: await getObjOfAnimalsBySex(userId),
      fetched: true,
    };
    return res.status(200).send(stats);
  } catch (error: any) {
    console.log(`Error en GET 'animal/stats'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
