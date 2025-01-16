import { Router } from "express";
import { deleteNote, getNotes, postNote, putNote } from "../controller/notes.js";
import { validateFields } from "../middleware/validateFields.js";
import { check } from "express-validator";
import { validateJwt } from "../middleware/validate-jwt.js";

const routerNotes = Router();

routerNotes.use(validateJwt)
routerNotes.get('/', getNotes);
routerNotes.post('/', [
    check('content', 'Content is required').not().isEmpty(),
    check('content', 'Content must be at least 5 characters').isLength({ min: 5 }),
    validateFields
], postNote);

routerNotes.put('/:id', [
    check('content', 'Content is required').not().isEmpty(),
    check('content', 'Content must be at least 5 characters').isLength({ min: 5 }),
    validateFields
], putNote);

routerNotes.delete('/:id', deleteNote);
export { routerNotes };