import { NoteRepository } from '../repositories/noteRepository.js';
import { validateNote } from '../utils/validator.js';

export class NoteService {
  static async listAll() {
    try {
      return await NoteRepository.getAll();
    } catch (error) {
      throw new Error('Erro ao listar notas');
    }
  }

  static async find(id) {
    try {
      const note = await NoteRepository.getById(id);
      if (!note) throw new Error('Nota não encontrada');
      return note;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(data) {
    try {
      if (!validateNote(data)) {
        throw new Error('Dados inválidos');
      }
      return await NoteRepository.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, data) {
    try {
      if (!validateNote(data)) {
        throw new Error('Dados inválidos');
      }
      await NoteRepository.update(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      await NoteRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
