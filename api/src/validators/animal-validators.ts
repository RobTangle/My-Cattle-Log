import { IAnimal, ITypeOfAnimal } from "../types/animal-types";
import {
  isFalsyArgument,
  isStringBetween1And50CharsLong,
  isStringBetween1AndXCharsLong,
  isStringXCharsLong,
  isValidSenasaId,
} from "./generic-validators";

// CHECK ANIMAL :
// This function is the main function that validates the data recived in the request for a POST of a new animal or a PUT for updating an Animal.
// It uses many other auxiliary functions to make sure all the data from the request is valid before trying to store a new instance of Animal in the Data Base.
// This function not only checks de data, but algo parses de name by forcing an toLowerCase() so the names are saved in all lower cases for a couple of different reasons regarding speed, performance and better practices.
export function checkAnimal(bodyFromReq: any): IAnimal {
  try {
    console.log(`Checking Animal...`);
    const checkedAnimal = {
      id_senasa: checkId(bodyFromReq.id_senasa),
      type_of_animal: checkTypeOfAnimal(bodyFromReq.type_of_animal),
      weight_kg: checkWeight(bodyFromReq.weight_kg),
      name: checkName(bodyFromReq.name),
      device_type: checkDeviceType(bodyFromReq.device_type),
      device_number: checkDeviceNumber(bodyFromReq.device_number),
    };
    return checkedAnimal;
  } catch (error: any) {
    console.log(`Error en fn checkNewAnimal. ${error.message}`);
    throw new Error(error.message);
  }
}

// CHECK DEVICE_TYPE:
function checkDeviceType(argFromReq: any): string {
  if (isStringBetween1And50CharsLong(argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`The device_type "${argFromReq}" is invalid.`);
  }
}

// CHECK DEVICE_NUMBER:
function checkDeviceNumber(argFromReq: any): string {
  if (isStringXCharsLong(8, argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`The device_number "${argFromReq}" is invalid.`);
  }
}

// CHECK ID_SENASA:
function checkId(idFromReq: any): string {
  if (isValidSenasaId(idFromReq)) {
    return idFromReq;
  } else {
    throw new Error(`The id_senasa "${idFromReq}" is invalid.`);
  }
}

// CHECK TYPE OF ANIMAL:
export function isValidTypeOfAnimal(argument: any): boolean {
  return Object.values(ITypeOfAnimal).includes(argument);
}

function checkTypeOfAnimal(argFromReq: any): ITypeOfAnimal {
  if (isValidTypeOfAnimal(argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`The type_of_animal "${argFromReq}" is invalid.`);
  }
}

// CHECK WEIGHT_KG:
function checkWeight(argFromReq: any): number | undefined {
  if (isFalsyArgument(argFromReq)) {
    return undefined;
  }
  let parsedArg = Math.round(Number(argFromReq));

  if (parsedArg && typeof parsedArg === "number" && parsedArg > 0) {
    return parsedArg;
  }
  throw new Error(`The weight_kg "${argFromReq}" is invalid.`);
}

// CHECK NAME: (algo forces lower cases)
function checkName(argFromReq: any): string {
  if (isStringBetween1AndXCharsLong(200, argFromReq)) {
    return argFromReq.toLowerCase();
  } else {
    throw new Error(`The name "${argFromReq}" es invalid.`);
  }
}
