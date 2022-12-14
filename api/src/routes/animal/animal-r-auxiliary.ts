import sequelize, { Op } from "sequelize";
import db from "../../models";
import { IAnimal, ITypeOfAnimal } from "../../types/animal-types";

// TYPES OF ANIMALS TO ARRAY :
export function typesOfAnimalsToArray(): string[] {
  try {
    let typesParsedToArray: string[] = Object.values(ITypeOfAnimal);
    return typesParsedToArray;
  } catch (error: any) {
    console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
    throw new Error(error.message);
  }
}

// GET AND PARSE IS PREGNANT QUERY
export async function getAndParseIsPregnantQuery(
  userId: string,
  status: boolean,
  order: string
) {
  try {
    // Si status de is_pregnant es falso:
    if (!status) {
      const listOfAnimalsNotPregnant: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: false,
          UserId: userId,
        },
      });
      return {
        listLength: listOfAnimalsNotPregnant.length,
        list: listOfAnimalsNotPregnant,
      };
    }
    // Si order es un valor válido, buscar los animales que están embarazados y en orden:
    if (order === "ASC" || order === "DESC" || order === "NULLS FIRST") {
      const listOfAnimalsOrdered: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: true,
          UserId: userId,
        },
        order: [["delivery_date", order]],
      });
      return {
        listLength: listOfAnimalsOrdered.length,
        list: listOfAnimalsOrdered,
      };
    }
    // Si el valor de orden es falsy, buscar todos los animales embarazados:
    if (!order && status === true) {
      const listOfAnimalsPregnant: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: status,
          UserId: userId,
        },
      });
      return {
        listLength: listOfAnimalsPregnant.length,
        list: listOfAnimalsPregnant,
      };
    }
  } catch (error: any) {
    console.log(`Error en fn aux getAndParseIsPregnantQuery. ${error.message}`);
    throw new Error(
      `Error al buscar y parsear con queries relacionados a animales preñados o no preñados.`
    );
  }
}

// --------------AUX FNS PARA STATS : --------------------------

// GET OBJ OF ANIMALS BY RACE :
export async function getObjOfAnimalsByRace(userId: string) {
  try {
    const breedNamesArrObjs = await db.Animal.findAll({
      attributes: [
        "breed_name",
        [sequelize.fn("count", sequelize.col("breed_name")), "cnt"],
      ],
      group: ["breed_name"],
      where: {
        UserId: userId,
      },
    });

    let arrayOfRaces: any[] = [];
    breedNamesArrObjs.forEach((elem: any) => {
      arrayOfRaces.push(elem.breed_name);
    });

    console.log("arrayOfRaces = ", arrayOfRaces);

    let objWithAnimalsByRaceAndCount = {};
    for (let i = 0; i < arrayOfRaces.length; i++) {
      objWithAnimalsByRaceAndCount = {
        ...objWithAnimalsByRaceAndCount,
        [arrayOfRaces[i]]: await db.Animal.findAndCountAll({
          where: {
            breed_name: arrayOfRaces[i],
            UserId: userId,
          },
        }),
      };
    }

    return objWithAnimalsByRaceAndCount;
  } catch (error: any) {
    console.log(`Error en fn aux getObjOfAnimalsByRace. ${error.message}`);
    throw new Error(`Error al parsear los animales por raza.`);
  }
}

// GET OBJ OF ANIMALS BY LOCATION :
export async function getObjOfAnimalsByLocation(userId: string) {
  try {
    let objOfAnimalsByLocation = {};

    const locationsArrObjs = await db.Animal.findAll({
      attributes: [
        "location",
        [sequelize.fn("count", sequelize.col("location")), "cnt"],
      ],
      group: ["location"],
      where: {
        UserId: userId,
      },
    });
    // console.log(locationsArrObjs);

    let arrayOfLocations: any[] = [];
    locationsArrObjs.forEach((elem: any) => {
      arrayOfLocations.push(elem.location);
    });
    console.log("arrayOfLocations ", arrayOfLocations);

    for (let i = 0; i < arrayOfLocations.length; i++) {
      const element = arrayOfLocations[i];
      objOfAnimalsByLocation = {
        ...objOfAnimalsByLocation,
        [element]: await db.Animal.findAndCountAll({
          where: {
            location: element,
            UserId: userId,
          },
        }),
      };
    }
    return objOfAnimalsByLocation;
  } catch (error: any) {
    console.log(`Error en fn aux getObjOfAnimalsByLocation. ${error.message}`);
    throw new Error(`Error al parsear los animales por localización.`);
  }
}

// GET OBJ OF ANIMALS BY DEVICE TYPE :
export async function getObjOfAnimalsByDeviceType(userId: string) {
  try {
    let objOfAnimalsByDeviceType = {};
    let deviceTypesArrObjs = await db.Animal.findAll({
      attributes: [
        "device_type",
        [sequelize.fn("count", sequelize.col("device_type")), "cnt"],
      ],
      group: "device_type",
      where: {
        UserId: userId,
      },
    });
    const deviceTypesArray: any[] = [];
    deviceTypesArrObjs.forEach((type: any) => {
      deviceTypesArray.push(type.device_type);
    });
    console.log(deviceTypesArray);

    for (let i = 0; i < deviceTypesArray.length; i++) {
      const element = deviceTypesArray[i];
      objOfAnimalsByDeviceType = {
        ...objOfAnimalsByDeviceType,
        [element]: await db.Animal.findAndCountAll({
          where: {
            device_type: element,
            UserId: userId,
          },
        }),
      };
    }
    console.log(objOfAnimalsByDeviceType);

    return objOfAnimalsByDeviceType;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`
    );
    throw new Error(`Error al parsear los animales por tipo de dispositivo.`);
  }
}

// GET OBJ OF ALL ANIMALS AND COUNT :
export async function getObjOfAllAnimalsAndCount(userId: string) {
  try {
    const allAnimalsAndCount = await db.Animal.findAndCountAll({
      where: {
        UserId: userId,
      },
    });
    return allAnimalsAndCount;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAllAnimalsAndCount. ${error.message}`
    );
    throw new Error(`Error al parsear el total de los animales.`);
  }
}

// GET OBJ OF ANIMALS PREGNANT :
export async function getObjOfAnimalsPregnant(userId: string) {
  try {
    let objOfAnimalsPregnant = await db.Animal.findAndCountAll({
      where: {
        is_pregnant: true,
        UserId: userId,
      },
    });
    return objOfAnimalsPregnant;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsPregnant. ${error.message}`
    );
    throw new Error(`Error al parsear los animales preñados.`);
  }
}

// GET OBJ OF ANIMALS NOT PREGNANT :
export async function getObjOfAnimalsNotPregnant(userId: string) {
  try {
    let objOfAnimalsNotPregnant = await db.Animal.findAndCountAll({
      where: {
        [Op.or]: [{ is_pregnant: false }, { is_pregnant: null }],
        UserId: userId,
      },
    });
    return objOfAnimalsNotPregnant;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsNotPregnant. ${error.message}`
    );
    throw new Error(`Error al parsear los animales no preñados.`);
  }
}

// GET OBJ OF ANIMALS BY SEX :

export async function getObjOfAnimalsBySex(userId: string) {
  try {
    const [femalePregnant, femaleNotPregnant, male, female] = await Promise.all(
      [
        db.Animal.findAndCountAll({
          where: {
            is_pregnant: true,
            UserId: userId,
          },
          order: [["delivery_date", "ASC"]],
        }),
        db.Animal.findAndCountAll({
          where: {
            [Op.or]: [
              { type_of_animal: ITypeOfAnimal.Vaca },
              { type_of_animal: ITypeOfAnimal.Vaquillona },
            ],
            is_pregnant: false,
            UserId: userId,
          },
        }),
        db.Animal.findAndCountAll({
          where: {
            [Op.or]: [
              { type_of_animal: ITypeOfAnimal.Toro },
              { type_of_animal: ITypeOfAnimal.Novillo },
            ],
            UserId: userId,
          },
        }),
        db.Animal.findAndCountAll({
          where: {
            [Op.or]: [
              { type_of_animal: ITypeOfAnimal.Vaca },
              { type_of_animal: ITypeOfAnimal.Vaquillona },
            ],
            UserId: userId,
          },
        }),
      ]
    );

    let objOfAnimalsBySex: any = {
      male: male,
      female: female,
      femalePregnant: femalePregnant,
      femaleNotPregnant: femaleNotPregnant,
    };

    return objOfAnimalsBySex;
  } catch (error: any) {
    console.log(`Error en fn aux getObjOfAnimalsBySex. ${error.message}`);
    throw new Error(`Error al parsear los animales por sexo.`);
  }
}

// GET OBJ OF ANIMALS BY TYPE OF ANIMAL :
export async function getObjOfAnimalsByTypeOfAnimal(userId: string) {
  try {
    let objOfAnimalsByType: any = {};
    let arrayDeTiposDeAnimales = Object.values(ITypeOfAnimal);
    console.log(arrayDeTiposDeAnimales);

    for (let i = 0; i < arrayDeTiposDeAnimales.length; i++) {
      const element = arrayDeTiposDeAnimales[i];
      objOfAnimalsByType = {
        ...objOfAnimalsByType,
        [element]: await db.Animal.findAndCountAll({
          where: {
            type_of_animal: element,
            UserId: userId,
          },
        }),
      };
      if (
        element == ITypeOfAnimal.Vaquillona ||
        element === ITypeOfAnimal.Vaca
      ) {
        let femaleAnimalsPregnant = await db.Animal.findAndCountAll({
          where: {
            is_pregnant: true,
            type_of_animal: element,
            UserId: userId,
          },
          order: [["delivery_date", "ASC"]],
        });
        objOfAnimalsByType[element].pregnant = femaleAnimalsPregnant;
      }
    }

    return objOfAnimalsByType;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`
    );
    throw new Error(`Error al parsear los animales por tipo de dispositivo.`);
  }
}

//! ------------------------------
// Ejemplo aproximado (e incompleto) del objeto que retorna la ruta "/stats":
// const stats = {
//   numberOfTotalAnimals: 211,
//   pregnant: { count: 11, rows: [{}, {}] },
//   notPregnant: { count: 76, rows: [{}, {}, {}] },
//   races: {
//     ["Angus"]: { count: 3, rows: [{}, {}, {}, {}] },
//     ["Criolla"]: { count: 2, rows: [{}, {}] },
//     ["Sin especificar"]: { count: 2, rows: [{}, {}] },
//   },
//   types: {
//     ["Vaquillona"]: {
//       count: 53,
//       rows: [{}, {}, {}, {}, {}],
//       pregnants: 11,
//     },
//     ["Toro"]: { count: 8, rows: [{}, {}] },
//     ["Novillo"]: { count: 13, rows: [{}, {}, {}] },
//   },
//   location: {
//     ["Sector 2"]: { count: 7, rows: [{}, {}, {}] },
//     ["Lote-4"]: { count: 2, rows: [{}, {}] },
//     ["Sin especificar"]: { count: 4, rows: [{}, {}] },
//   },
//   deviceType: {
//     ["Ear Tag"]: { count: 34, rows: [{}, {}, {}, {}] },
//     ["Collar"]: { count: 9, rows: [{}, {}] },
//   },
// };
