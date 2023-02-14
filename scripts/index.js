/* eslint-disable no-use-before-define */
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const list = document.getElementById('list');

let books = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor(){
    this.books = [];
  }
  
  add(title, author){
    let book = new Book(title, author);
    this.books.push(book);
  }
  remove(index){
    this.books.splice(index, 1);
  }
}

let colection = new Books();

function addingBookToHtml(Title, Author, index) {
  const div = document.createElement('div');
  div.className = 'listItem';
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
    colection.remove(index);
    addAllBooks();
    localStorage.books = JSON.stringify(colection.books);
    console.log(colection.books)
  }));
  div.appendChild(title);
  div.appendChild(author);
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
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.books) {
    colection.books = JSON.parse(localStorage.books);
  }
  addAllBooks();
});
