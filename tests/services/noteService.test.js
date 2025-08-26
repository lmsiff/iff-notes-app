import { NoteService } from '../../services/noteService.js';

describe('Note Service', () => {
  it('should throw an error if the note is invalid', async () => {
    await expect(NoteService.create({ title: '', content: '' }))
      .rejects
      .toThrow('Dados inválidos');
  });
});
