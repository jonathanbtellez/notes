import { response } from "express";
import { Note } from "../model/note.js";

export const getNotes = async (req, res = response) => {
    const notes = await Note.find({user: req.uid}).populate('user', 'name');
    res.json({
        status: 'success',
        data: notes
    });
}

export const postNote = async (req, res = response) => {
    const { content, important = false } = req.body;

    const note = new Note({
        content,
        important,
        date: new Date(),
        user: req.uid
    });

    const savedNote = await note.save();
    res.status(201).json({
        status: 'success',
        data: savedNote
    });
}

export const putNote = async (req, res = response) => {
    const { id } = req.params;
    const { uid } = req
    const note = await Note.findById({ _id : id });

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'note not found'
        });
    }

    if (note.user.toString() !== uid) {
        return res.status(401).json({
            status: "error",
            msg: 'You can not edit this note'
        });
    }

    const newNote = {
       ...req.body,
       user: uid
    }

    const updatedNote = await Note.findOneAndUpdate({_id: id}, newNote, { new: true } )

    res.status(201).json({
        status: 'success',
        data: updatedNote
    });
}

export const deleteNote = async (req, res = response) => {

    const { id } = req.params;
    const { uid } = req
    
    const note = await Note.findById({ _id : id });

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'note not found'
        });
    }

    if (note.user.toString() !== uid) {
        return res.status(401).json({
            status: "error",
            msg: 'You can not edit this note'
        });
    }

    await Note.findByIdAndDelete({ _id: id });

    res.status(200).json({
        status: 'success',
        message: 'note deleted'
    });

}