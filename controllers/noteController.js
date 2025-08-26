import { NoteService } from '../services/noteService.js';

export async function getAllNotes(req, res) {
  try {
    const notes = await NoteService.listAll();
    res.json(notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await NoteService.find(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

export async function createNote(req, res) {
  try {
    const newNote = await NoteService.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateNote(req, res) {
  try {
    await NoteService.update(req.params.id, req.body);
    res.send('Nota atualizada com sucesso');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteNote(req, res) {
  try {
    await NoteService.delete(req.params.id);
    res.send('Nota excluída com sucesso');
  } catch (error) {
    res.status(500).send(error.message);
  }
}
