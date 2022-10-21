import db from "../../models";
import { IUser } from "../../types/user-types";
import { isEmail } from "../../validators/generic-validators";

export async function emailExistsInDataBase(emailFromReq: any): Promise<void> {
  if (!isEmail(emailFromReq)) {
    throw new Error(
      `Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`
    );
  }
  let emailRegisteredAlready: IUser = await db.User.findOne({
    where: {
      email: emailFromReq,
    },
  });
  if (emailRegisteredAlready) {
    throw new Error(
      `El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`
    );
  }
}
