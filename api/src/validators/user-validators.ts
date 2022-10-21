import { IUser } from "../types/user-types";
import {
  isEmail,
  isFalsyArgument,
  isStringBetween1And101CharsLong,
  isStringBetween1And50CharsLong,
} from "./generic-validators";

export function checkUser(bodyFromReq: any): IUser {
  console.log(`Checking User...`);
  try {
    const checkedUser: IUser = {
      id: checkUserId(bodyFromReq.id),
      name: checkUserName(bodyFromReq.name),
      email: checkEmail(bodyFromReq.email),
    };
    return checkedUser;
  } catch (error: any) {
    console.log(`Error en fn checkUser. ${error.message}`);
    throw new Error(error.message);
  }
}

// CHECK USER ID :
function checkUserId(idFromReq: any): string {
  if (isStringBetween1And101CharsLong(idFromReq)) {
    return idFromReq;
  } else {
    throw new Error(`Invalid user id`);
  }
}

function checkUserName(nameFromReq: any): string | undefined {
  if (isFalsyArgument(nameFromReq)) {
    return undefined;
  }
  if (isStringBetween1And50CharsLong(nameFromReq)) {
    return nameFromReq;
  } else {
    throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
  }
}

//CHECK VALID EMAIL
export function checkEmail(emailFromReq: any): string {
  if (isEmail(emailFromReq)) {
    return emailFromReq;
  }
  throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}
