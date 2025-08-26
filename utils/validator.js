export function validateNote(note) {
  if (!note || typeof note !== 'object') return false;
  const { title, content } = note;
  return typeof title === 'string' && title.trim() !== '' &&
         typeof content === 'string' && content.trim() !== '';
}
