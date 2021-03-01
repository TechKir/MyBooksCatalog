import { booksFilter } from './filter';
import { displayBooks } from './display';

const sortModalId = document.getElementById('sortModalId');
const sortByTitleBtn = document.getElementById('sortByTitle');
const sortByAuthorBtn = document.getElementById('sortByAuthor');
const sortByCategoryBtn = document.getElementById('sortByCategory');
const sortByPriorityBtn = document.getElementById('sortByPriority');

const ls = window.localStorage;

sortByTitleBtn.addEventListener('click', () => {
  sortBooks('title');
  booksFilter();
});
sortByAuthorBtn.addEventListener('click', () => {
  sortBooks('author');
  booksFilter();
});
sortByCategoryBtn.addEventListener('click', () => {
  sortBooks('category');
  booksFilter();
});
sortByPriorityBtn.addEventListener('click', () => {
  sortBooks('priority');
  booksFilter();
});

function showSortOptions() {
  sortModalId.style.display = 'inline-block';
}

function hideSortOptions() {
  setTimeout(() => {
    sortModalId.style.display = 'none';
  }, 100);
}

function sortBooks(sortBy) {
  const booksArr = JSON.parse(ls.getItem('books'));
  if (sortBy === 'priority') {
    booksArr.sort((bookA, bookB) => {
      if (bookA[sortBy] > bookB[sortBy]) return -1;
      if (bookA[sortBy] < bookB[sortBy]) return 1;
      return 0;
    });
  } else {
    booksArr.sort((bookA, bookB) => {
      if (bookA[sortBy] > bookB[sortBy]) return 1;
      if (bookA[sortBy] < bookB[sortBy]) return -1;
      return 0;
    });
  }
  ls.setItem('books', JSON.stringify(booksArr));
  displayBooks(booksArr);
}

export { showSortOptions, hideSortOptions, sortBooks };
