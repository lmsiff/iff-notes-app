export class NoteDTO {
  constructor({ title, content }) {
    this.title = title;
    this.content = content;
  }

  isValid() {
    return (
      typeof this.title === 'string' &&
      this.title.trim() !== '' &&
      typeof this.content === 'string' &&
      this.content.trim() !== ''
    );
  }
}
