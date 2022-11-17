import { INote } from "../../types/note-types";
import db from "../../models";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { throwErrorIfUserIsNotRegisteredInDB } from "../user/user-r-auxiliary";
import { validateNewNote } from "../../validators/note-validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
const router = Router();

// POST NEW NOTE :
router.post("/newNote", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    let checkedNoteObj = validateNewNote(req.body);
    const newNote = await db.Note.create(checkedNoteObj);
    await newNote.setUser(userId);

    return res.status(200).send(newNote);
  } catch (error: any) {
    console.log(`Eror en ruta  POST 'note/newNote'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET ALL NOTES FROM USER :
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

// DELETE NOTE :
router.delete("/:id", jwtCheck, async (req: any, res) => {
  try {
    const noteIdFromParams = req.params.id;
    if (!noteIdFromParams) {
      throw new Error(`Error. Debe ingresar un id por params.`);
    }
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    let deletedNote = await db.Note.destroy({
      where: {
        id: noteIdFromParams,
        UserId: userId,
      },
    });
    if (deletedNote !== 1) {
      return res.status(400).send({
        error: "Lo siento. Algo salió mal: La nota no ha sido eliminada",
      });
    }
    return res.status(200).send({
      msg: `${deletedNote} nota eliminada exitosamente`,
      status: true,
    });
  } catch (error: any) {
    console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// UPDATE NOTE :
router.put("/", jwtCheck, async (req: any, res) => {
  try {
    const noteId = req.body.id;
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    const validatedNote: INote = validateNewNote(req.body);
    let updatedNote = await db.Note.update(
      { ...validatedNote, id: noteId },
      {
        where: {
          id: noteId,
          UserId: userId,
        },
      }
    );
    return res.status(200).send({
      updated: Number(updatedNote[0]),
      msg: `${updatedNote[0]} nota ha sido actualizada.`,
    });
  } catch (error: any) {
    console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
