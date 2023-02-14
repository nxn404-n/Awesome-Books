/* eslint-disable no-use-before-define */
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const list = document.getElementById('list');

class Books {
  constructor() {
    this.books = [];
  }

  add(title, author) {
    this.books.push({ title, author });
  }

  remove(index) {
    this.books.splice(index, 1);
  }
}

const colection = new Books();

function addingBookToHtml(Title, Author, index) {
  const div = document.createElement('div');
  div.className = 'listItem';
  div.setAttribute('id', index);
  const p = document.createElement('p');
  p.innerHTML = `"${Title}" by ${Author}`;
  p.className = 'description';
  const button = document.createElement('button');
  button.innerHTML = 'Remove';
  button.className = 'RemoveButton';
  button.setAttribute('id', 'removeButton');
  button.addEventListener('click', ((e) => {
    const parent = e.target.parentElement;
    const index = parent.id;
    colection.remove(index);
    addAllBooks();
    localStorage.books = JSON.stringify(colection.books);
    if (colection.books.length === 0) {
      list.style.border = 'none';
    }
  }));
  div.appendChild(p);
  div.appendChild(button);
  list.appendChild(div);
}

function addAllBooks() {
  list.innerHTML = '';
  colection.books.forEach((book, index) => {
    addingBookToHtml(book.title, book.author, index);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  colection.add(title.value, author.value);
  addAllBooks();
  list.style.border = '2px solid black';
  title.value = '';
  author.value = '';
  localStorage.books = JSON.stringify(colection.books);
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.books) {
    colection.books = JSON.parse(localStorage.books);
  }
  if (colection.books.length === 0) {
    list.style.border = 'none';
  } else {
    list.style.border = '2px solid black';
  }
  addAllBooks();
});
