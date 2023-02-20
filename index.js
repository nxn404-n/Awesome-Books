/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/named
import { toastMixin } from './modules/animation.js';
import { showTime, currentTime } from './modules/shotime.js';
import {
  bookList, addNewForm, contactForm, listLink, addNewLink, contactLink,
} from './modules/spa.js';
import {
  form, title, author, list,
} from './modules/form.js';

// Book Class
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

const addingBookToHtml = (Title, Author, index) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  div.className = 'listItem';
  div.setAttribute('id', index);
  const titleElement = document.createElement('p');
  titleElement.textContent = Title;
  titleElement.className = 'title';
  const authorElement = document.createElement('p');
  authorElement.textContent = Author;
  authorElement.className = 'author';
  span.appendChild(titleElement);
  span.appendChild(authorElement);
  const button = document.createElement('button');
  button.textContent = 'Remove';
  button.className = 'RemoveButton';
  button.setAttribute('id', 'removeButton');
  button.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    const index = parent.id;
    colection.remove(index);
    addAllBooks();
    localStorage.books = JSON.stringify(colection.books);
    toastMixin.fire({
      animation: true,
      title: 'Book Removed',
    });
  });
  div.appendChild(span);
  div.appendChild(button);
  list.appendChild(div);
};

const addAllBooks = () => {
  list.innerHTML = '';
  colection.books.forEach((book, index) => {
    addingBookToHtml(book.title, book.author, index);
  });
};

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

// Show Time

showTime.innerHTML = currentTime();

setInterval(() => {
  showTime.innerHTML = currentTime();
}, 1000);
