// ====== DATA STORE (front‑end only) ======
const books = [];   // later you can replace this with DB data

// ====== ELEMENTS ======
const addBtn    = document.getElementById('addBookBtn');
const updBtn    = document.getElementById('updateBookBtn');
const delBtn    = document.getElementById('deleteBookBtn');

const addSec    = document.getElementById('addSection');
const updSec    = document.getElementById('updateSection');
const delSec    = document.getElementById('deleteSection');

const saveBtn   = document.getElementById('saveBookBtn');
const applyUpd  = document.getElementById('applyUpdateBtn');
const applyDel  = document.getElementById('applyDeleteBtn');

const list      = document.getElementById('bookList');

// ====== HELPER: SHOW/HIDE SECTIONS ======
function showSection(which) {
    addSec.style.display = (which === 'add') ? 'block' : 'none';
    updSec.style.display = (which === 'upd') ? 'block' : 'none';
    delSec.style.display = (which === 'del') ? 'block' : 'none';
}

// ====== HELPER: RENDER BOOKS ======
function renderBooks() {
    list.innerHTML = '';
    books.forEach((b, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${b.name} by ${b.author} - $${b.price}`;
        list.appendChild(li);
    });
}

// ====== BUTTON EVENTS (OPEN FORMS) ======
addBtn.addEventListener('click',   () => showSection('add'));
updBtn.addEventListener('click',   () => showSection('upd'));
delBtn.addEventListener('click',   () => showSection('del'));

// ====== ADD BOOK ======
saveBtn.addEventListener('click', () => {
    const author = document.getElementById('author').value.trim();
    const name   = document.getElementById('bookName').value.trim();
    const price  = document.getElementById('price').value.trim();

    if (!author || !name || !price) {
        alert('Please fill all fields.');
        return;
    }

    books.push({ author, name, price });
    renderBooks();

    document.getElementById('author').value   = '';
    document.getElementById('bookName').value = '';
    document.getElementById('price').value    = '';

    showSection(null);   // hide forms
});

// ====== UPDATE BOOK ======
applyUpd.addEventListener('click', () => {
    const idx = parseInt(document.getElementById('editIndex').value, 10) - 1;
    const a   = document.getElementById('newAuthor').value.trim();
    const n   = document.getElementById('newBookName').value.trim();
    const p   = document.getElementById('newPrice').value.trim();

    if (idx < 0 || idx >= books.length) {
        alert('Invalid book number.');
        return;
    }
    if (!a || !n || !p) {
        alert('Please fill all fields.');
        return;
    }

    books[idx] = { author: a, name: n, price: p };
    renderBooks();
    showSection(null);
});

