import db from "../../models";
import { IAnimal, ITypeOfAnimal } from "../../types/animal-types";

export function typesOfAnimalsToArray(): string[] {
  try {
    let typesParsedToArray: string[] = Object.values(ITypeOfAnimal);
    return typesParsedToArray;
  } catch (error: any) {
    console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
    throw new Error(error.message);
  }
}

export async function getAndParseIsPregnantQuery(
  userId: any, //! cambiar a STRING
  status: boolean,
  order: string
) {
  try {
    // Si status de is_pregnant es falso:
    if (!status) {
      const listOfAnimalsNotPregnant: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: false,
          // UserId: userId,
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
          // UserId: userId,
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
          // UserId: userId,
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

const stats = {
  numberOfTotalAnimals: 211,
  pregnants: { total: 11, list: [{}, {}] },
  notPregnants: { total: 76, list: [{}, {}, {}] },
  races: {
    ["Angus"]: { listLength: 3, list: [{}, {}, {}, {}] },
    ["Criolla"]: { listLength: 2, list: [{}, {}] },
    ["Sin especificar"]: { listLength: 2, list: [{}, {}] },
  },
  types: {
    ["Vaquillona"]: {
      listLength: 53,
      list: [{}, {}, {}, {}, {}],
      pregnants: 11,
    },
    ["Toro"]: { listLength: 8, list: [{}, {}] },
    ["Novillo"]: { listLength: 13, list: [{}, {}, {}] },
  },
  location: {
    ["Sector 2"]: { listLength: 7, list: [{}, {}, {}] },
    ["Lote-4"]: { listLength: 2, list: [{}, {}] },
    ["Sin especificar"]: { listLength: 4, list: [{}, {}] },
  },
  deviceType: {
    ["Ear Tag"]: { listLength: 34, list: [{}, {}, {}, {}] },
    ["Collar"]: { listLength: 9, list: [{}, {}] },
  },
};
