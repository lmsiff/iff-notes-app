import { NoteService } from '../services/noteService.js';

export class NoteController {
  async getAll(req, res) {
    try {
      const notes = await NoteService.listAll();
      res.json(notes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getById(req, res) {
    try {
      const note = await NoteService.find(req.params.id);
      res.json(note);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async create(req, res) {
    try {
      const newNote = await NoteService.create(req.body);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async update(req, res) {
    try {
      await NoteService.update(req.params.id, req.body);
      res.send('Note updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      await NoteService.delete(req.params.id);
      res.send('Note deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
