import db from '../database/db.js';

export class NoteRepository {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM notes', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async create(note) {
    const updated = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO notes (title, content, updated) VALUES (?, ?, ?)',
        [note.title, note.content, updated],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...note, updated });
        }
      );
    });
  }

  static async update(id, note) {
    const updated = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE notes SET title = ?, content = ?, updated = ? WHERE id = ?',
        [note.title, note.content, updated, id],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
