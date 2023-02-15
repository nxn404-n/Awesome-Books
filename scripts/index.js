/* eslint-disable no-use-before-define */
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const list = document.getElementById('list');

/* eslint-disable no-undef */
const toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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
  const span = document.createElement('span');
  div.className = 'listItem';
  div.setAttribute('id', index);
  const title = document.createElement('p');
  title.innerHTML = Title;
  title.className = 'title';
  const author = document.createElement('p');
  author.innerHTML = Author;
  author.className = 'author';
  span.appendChild(title);
  span.appendChild(author);
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
    toastMixin.fire({
      animation: true,
      title: 'Book Removed',
    });
  }));
  div.appendChild(span);
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
  title.value = '';
  author.value = '';
  localStorage.books = JSON.stringify(colection.books);
  toastMixin.fire({
    animation: true,
    title: 'Book Added',
  });
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.books) {
    colection.books = JSON.parse(localStorage.books);
  }
  addAllBooks();
});

// SPA Navigation

const bookList = document.getElementById('bookList');
const addNewForm = document.getElementById('addNewForm');
const contactForm = document.getElementById('contactForm');

const listLink = document.getElementById('listLink');
const addNewLink = document.getElementById('addNewLink');
const contactLink = document.getElementById('contactLink');

listLink.addEventListener('click', () => {
  bookList.classList.remove('display-none');
  addNewForm.classList.add('display-none');
  contactForm.classList.add('display-none');
  listLink.classList.add('listSelected');
  addNewLink.classList.remove('addNewSelected');
  contactLink.classList.remove('contactSelected');
});
addNewLink.addEventListener('click', () => {
  bookList.classList.add('display-none');
  addNewForm.classList.remove('display-none');
  contactForm.classList.add('display-none');
  listLink.classList.remove('listSelected');
  addNewLink.classList.add('addNewSelected');
  contactLink.classList.remove('contactSelected');
});
contactLink.addEventListener('click', () => {
  bookList.classList.add('display-none');
  addNewForm.classList.add('display-none');
  contactForm.classList.remove('display-none');
  listLink.classList.remove('listSelected');
  addNewLink.classList.remove('addNewSelected');
  contactLink.classList.add('contactSelected');
});