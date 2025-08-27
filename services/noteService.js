import { NoteRepository } from '../repositories/noteRepository.js';
import { NoteDTO } from '../dtos/note.dto.js';

export class NoteService {
  static async listAll() {
    return await NoteRepository.getAll();
  }

  static async find(id) {
    const note = await NoteRepository.getById(id);
    if (!note) throw new Error('Note not found');
    return note;
  }

  static async create(data) {
    const dto = new NoteDTO(data);
    if (!dto.isValid()) throw new Error('Invalid data');
    return await NoteRepository.create(dto);
  }

  static async update(id, data) {
    const dto = new NoteDTO(data);
    if (!dto.isValid()) throw new Error('Invalid data');
    await NoteRepository.update(id, dto);
  }

  static async delete(id) {
    await NoteRepository.delete(id);
  }
}
