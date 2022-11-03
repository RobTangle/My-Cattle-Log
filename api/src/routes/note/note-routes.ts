import { INote, EImportance } from "../../types/note-types";
import db from "../../models";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import {
  throwErrorIfUserIsNotRegisteredInDB,
  userIsRegisteredInDB,
} from "../user/user-r-auxiliary";
import { validateNewNote } from "../../validators/note.validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
const router = Router();

router.post("/newNote", jwtCheck, async (req: any, res) => {
  try {
    console.log("NEW NOTE BODY = ", req.body);
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    let checkedNoteObj = validateNewNote(req.body);
    const newNote = await db.Note.create(checkedNoteObj);
    console.log("Nueva nota creada: ", newNote.toJSON());
    return res.status(200).send(newNote);
  } catch (error: any) {
    console.log(`Eror en ruta  POST 'note/newNote'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/all", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    const allNotesFromUser = await getAllNotesFromUser(userId);
    return res.status(200).send(allNotesFromUser);
  } catch (error: any) {
    console.log(`Error en ruta GET 'note/all'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});
