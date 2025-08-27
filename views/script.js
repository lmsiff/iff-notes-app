class NotesApp {
  constructor() {
    this.selectedNoteId = null;
    this._initElements();
    this._initEvents();
    this._loadNotes();
  }

  _initElements() {
    this.addButton = document.querySelector('.add-note');
    this.notesList = document.querySelector('.notes-list');
    this.titleInput = document.querySelector('.preview-title');
    this.bodyInput = document.querySelector('.preview-body');
    this.sidebar = document.querySelector('.notes-sidebar');
    this.toggleButton = document.querySelector('.toggle-sidebar');
    this.toggleIcon = this.toggleButton.querySelector('i');
  }

  _initEvents() {
    this.addButton.addEventListener('click', () => this._createNote());
    this.titleInput.addEventListener('input', () => this._updateNote());
    this.bodyInput.addEventListener('input', () => this._updateNote());
    this.toggleButton.addEventListener('click', () => this._toggleSidebar());
  }

  async _loadNotes() {
    try {
      const res = await fetch('/api/notes');
      const notes = await res.json();
      this._renderNotes(notes);
    } catch (error) {
      console.error('Error on load notes:', error);
    }
  }

  async _createNote() {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Enter a Title...',
          content: 'Enter a Body...'
        })
      });
      const newNote = await res.json();
      this.selectedNoteId = newNote.id;
      this._loadNotes();
    } catch (error) {
      console.error('Error on create note:', error);
    }
  }

  async _updateNote() {
    if (!this.selectedNoteId) return;

    const title = this.titleInput.value;
    const content = this.bodyInput.value;

    try {
      await fetch(`/api/notes/${this.selectedNoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      this._loadNotes();
    } catch (error) {
      console.error('Error on update note:', error);
    }
  }

  async _deleteNote(id) {
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (this.selectedNoteId === id) {
        this.selectedNoteId = null;
        this._clearPreview();
      }
      this._loadNotes();
    } catch (error) {
      console.error('Error on remove note:', error);
    }
  }

  _renderNotes(notes) {
    this.notesList.innerHTML = '';

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.classList.add('note');
      noteEl.setAttribute('data-id', note.id);
      if (note.id === this.selectedNoteId) noteEl.classList.add('note-activated');

      noteEl.innerHTML = `
        <div>
          <div class="header-title">${note.title}</div>
          <div class="header-updated">Last Update: ${this._formatDate(note.updated)}</div>
        </div>
        <button class="remove-note">❌</i></button>
      `;

      noteEl.addEventListener('click', () => this._selectNote(note));
      noteEl.querySelector('.remove-note').addEventListener('click', (e) => {
        e.stopPropagation();
        this._deleteNote(note.id);
      });

      this.notesList.appendChild(noteEl);
    });

    this._updatePreview(notes.find(n => n.id === this.selectedNoteId));
  }

  _selectNote(note) {
    this.selectedNoteId = note.id;
    this._updatePreview(note);
    this._loadNotes();
  }

  _updatePreview(note) {
    if (note) {
      this.titleInput.value = note.title;
      this.bodyInput.value = note.content;
      this.titleInput.disabled = false;
      this.bodyInput.disabled = false;
    } else {
      this._clearPreview();
    }
  }

  _clearPreview() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.titleInput.disabled = true;
    this.bodyInput.disabled = true;
  }

  _toggleSidebar() {
    this.sidebar.classList.toggle('show');
    this.toggleIcon.classList.toggle('fa-angle-right');
    this.toggleIcon.classList.toggle('fa-angle-left');
  }

  _formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

}

document.addEventListener('DOMContentLoaded', () => new NotesApp());
