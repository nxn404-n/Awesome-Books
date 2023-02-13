/* eslint-disable no-use-before-define */
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const list = document.getElementById('list');

let books = [];

function addingBookToHtml(Title, Author, index) {
  const div = document.createElement('div');
  div.className = 'list';
  div.setAttribute('id', index);
  const title = document.createElement('p');
  title.innerHTML = Title;
  title.className = 'bookTitle';
  const author = document.createElement('p');
  author.innerHTML = Author;
  author.className = 'bookAuthor';
  const button = document.createElement('button');
  button.innerHTML = 'Remove';
  button.className = 'RemoveButton';
  button.setAttribute('id', 'removeButton');
  button.addEventListener('click', ((e) => {
    const parent = e.target.parentElement;
    const index = parent.id;
    books.splice(index, 1);
    addAllBooks();
    localStorage.books = JSON.stringify(books);
  }));
  const hr = document.createElement('hr');
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(button);
  div.appendChild(hr);
  list.appendChild(div);
}

function addAllBooks() {
  list.innerHTML = '';
  books.forEach((book, index) => {
    addingBookToHtml(book.title, book.author, index);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  books.push({ title: title.value, author: author.value });
  addAllBooks();
  title.value = '';
  author.value = '';
  localStorage.books = JSON.stringify(books);
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.books) {
    books = JSON.parse(localStorage.books);
  }
  addAllBooks();
});
