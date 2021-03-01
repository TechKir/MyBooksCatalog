/* eslint-disable no-alert */
import sampleBooks from './data/sampleBooks.json';

const booksQuantity = document.getElementById('booksQuantity');
const ls = window.localStorage;
const booksArr = JSON.parse(ls.getItem('books'));

// SHORT AND FAST INPUTS VALIDATION FUNCTION//
function validate(data) {
  if (data.title.length < 1) {
    window.alert('It is necessery to write the title');
    return false;
  }
  if (data.author < 1) {
    window.alert('It is necessery to write an author');
    return false;
  }
  if (data.category === undefined) {
    window.alert('It is necessery to select category');
    return false;
  }
  if (data.priority === undefined) {
    window.alert('It is necessery to choose a book priority');
    return false;
  }
  return true;
}

function booksCounter() {
  const trBook = document.querySelectorAll('tr');
  return trBook.length - 1; // We don't count first tr because it contains names of columns //
}

function setBookCounter() {
  booksQuantity.innerHTML = `Books quantity: ${booksCounter()}`;
}

function countCategory(category) {
  let sum = 0;

  if (booksArr) {
    booksArr.forEach((book) => {
      if (book.category === category) {
        sum++;
      }
    });
    return sum;
  }

  return 0;
}

function setLsEntryValues() {
  if (ls.getItem('books') === null) {
    ls.setItem('books', JSON.stringify(sampleBooks));
  }
  if (ls.getItem('categories') === null) {
    ls.setItem(
      'categories',
      JSON.stringify(['crime', 'sci-fi', 'fantasy', 'poem', 'drama', 'science'])
    );
  }
}

export { validate, booksCounter, setBookCounter, countCategory, setLsEntryValues };
