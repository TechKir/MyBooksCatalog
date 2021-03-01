/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import {
  displayFilterOptions,
  hookFilterCategoriesInputs,
  booksFilter,
  resetFilters,
} from './filter';

import { displayBooks, displayCategories } from './display';
import { validate, setBookCounter, setLsEntryValues } from './tools';

const categoriesList = document.getElementById('categoriesId');
const categorySelect = document.getElementById('categorySelect');
const filterByAuthorSelect = document.getElementById('filterByAuthor');
const filterByCategoryLi = document.getElementById('filterByCategory');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const addBookForm = document.getElementById('addBookForm');
const radioInputs = document.querySelectorAll('.formBox__radio');

setLsEntryValues();
const ls = window.localStorage;
let booksArr = JSON.parse(ls.getItem('books'));
const categories = JSON.parse(ls.getItem('categories'));

function addCategory() {
  const category = window.prompt('Add new category');
  if (category === null) {
    return;
  }

  // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
  resetFilters();
  categoriesList.innerHTML = '';
  categorySelect.innerHTML = '';
  filterByAuthorSelect.innerHTML = '';
  filterByCategoryLi.innerHTML = 'categories: &nbsp';

  categories.push(category);
  ls.setItem('categories', JSON.stringify(categories));
  displayFilterOptions(booksArr, categories);
  displayCategories(categories);
  hookFilterCategoriesInputs();
}

function addBook(e) {
  e.preventDefault();

  // TAKE ALL THE DATA FROM FORM:
  const data = new FormData(addBookForm);
  const inputsData = {};
  for (const entry of data) {
    inputsData[entry[0]] = entry[1];
  }

  if (validate(inputsData) === false) {
    return; // VALIDATION NOT PASS - CLOSEING FUNCTION
  }

  booksArr.push(inputsData);
  ls.setItem('books', JSON.stringify(booksArr));

  setBookCounter();
  displayBooks(booksArr);

  // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
  titleInput.value = '';
  authorInput.value = '';
  radioInputs.forEach((radioBtn) => {
    radioBtn.checked = false;
  });

  categoriesList.innerHTML = '';
  categorySelect.innerHTML = '';
  filterByAuthorSelect.innerHTML = '';
  filterByCategoryLi.innerHTML = 'categories: &nbsp';

  displayFilterOptions(booksArr, categories);
  displayCategories(categories);

  hookFilterCategoriesInputs();
  booksFilter();
  resetFilters();
}

function removeAllBooks() {
  booksArr = [];
  ls.setItem('books', JSON.stringify(booksArr));

  // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
  categoriesList.innerHTML = '';
  categorySelect.innerHTML = '';
  filterByAuthorSelect.innerHTML = '';
  filterByCategoryLi.innerHTML = 'categories: &nbsp';

  displayFilterOptions(booksArr, categories);
  displayCategories(categories);
  setBookCounter();
  resetFilters();
  displayBooks(booksArr);
}

function printList() {
  window.print();
}

export { addBook, addCategory, printList, removeAllBooks };
