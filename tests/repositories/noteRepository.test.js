import { NoteRepository } from '../../repositories/noteRepository.js';

describe('Note Repository', () => {
  it('should insert and find a note', async () => {
    const note = await NoteRepository.create({ title: 'Teste', content: 'Conteúdo' });
    const fetched = await NoteRepository.getById(note.id);
    expect(fetched.title).toBe('Teste');
  });
});
