import { IAnimal, ITypeOfAnimal } from "../types/animal-types";
import {
  isFalsyArgument,
  isStringBetween1And50CharsLong,
  isStringBetween1AndXCharsLong,
  isStringXCharsLong,
  isValidSenasaId,
} from "./generic-validators";

export function checkNewAnimal(bodyFromReq: any): IAnimal {
  try {
    console.log(`Checking New Animal...`);
    const checkedNewAnimal = {
      id_senasa: checkId(bodyFromReq.id_senasa),
      type_of_animal: checkTypeOfAnimal(bodyFromReq.type_of_animal),
      weight_kg: checkWeight(bodyFromReq.weight_kg),
      name: checkName(bodyFromReq.name),
      device_type: checkDeviceType(bodyFromReq.device_type),
      device_number: checkDeviceNumber(bodyFromReq.device_number),
    };
    return checkedNewAnimal;
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

// CHECK NAME:
function checkName(argFromReq: any): string {
  if (isStringBetween1AndXCharsLong(200, argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`The name "${argFromReq}" es invalid.`);
  }
}
