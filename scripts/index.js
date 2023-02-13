const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');

let books = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  books.push({title : title.value, author: author.value })
  console.log(books);
})