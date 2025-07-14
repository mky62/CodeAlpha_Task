const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

// Load saved notes
loadNotes();

// Create note function
function createNote(text = "") {
  const note = document.createElement('p');
  note.className = 'input-box';
  note.contentEditable = true;
  note.innerText = text;

  const del = document.createElement('img');
  del.src = 'images/delete.png';
  del.alt = 'Delete note';

  // Delete with animation
  del.addEventListener('click', () => {
    note.classList.add('fade-out');
    setTimeout(() => {
      note.remove();
      saveNotes();
    }, 300);
  });

  note.addEventListener('input', saveNotes);

  note.appendChild(del);
  notesContainer.appendChild(note);
}

// Save notes to localStorage
function saveNotes() {
  const all = Array.from(document.querySelectorAll('.input-box'))
    .map(n => n.innerText.trim());
  localStorage.setItem('notes', JSON.stringify(all));
}

// Load notes from localStorage
function loadNotes() {
  const saved = JSON.parse(localStorage.getItem('notes')) || [];
  saved.forEach(createNote);
}

// Button to add note
createBtn.addEventListener('click', () => {
  createNote();
  saveNotes();
});
