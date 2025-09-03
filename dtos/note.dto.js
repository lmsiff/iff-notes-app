export class NoteDTO {
  constructor({ title, content }) {
    this.title = title;
    this.content = content;
  }

  isValid() {
    return (
      typeof this.title === 'string' &&
      typeof this.content === 'string'
    );
  }
}
