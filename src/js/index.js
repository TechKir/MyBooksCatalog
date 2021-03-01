/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-blocks */
/* eslint-disable space-in-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */

// PURE VANILLA JS CODE - TASK REQUIREMENT. WITHOUT CLASSES, ARROW FUNCTIONS AND REST GOODIES FROM ES6+ AND FRAMEWORKS LIKE REACT. BECAUSE OF THIS I HAVE TO DISABLE SOME ESLINT MODES. //
import { displayFilterOptions, hookFilterCategoriesInputs } from './filter';
import { displayBooks, displayCategories } from './display';
import {
  addBook,
  addCategory,
  removeAllBooks,
  printList
} from './service';
import { setBookCounter, setLsEntryValues } from './tools';
import { showSortOptions, hideSortOptions } from './sort';

document.addEventListener('DOMContentLoaded', () => {

  const addBookForm = document.getElementById('addBookForm');
  const removeList = document.getElementById('removeAllBooks');
  const printBtn = document.getElementById('print');
  const addNewCategory = document.getElementById('addNewCategory');
  const sortBtn = document.getElementById('sort');

  addBookForm.addEventListener('submit', addBook);
  removeList.addEventListener('click', removeAllBooks);
  printBtn.addEventListener('click', printList);
  addNewCategory.addEventListener('click', addCategory);
  sortBtn.addEventListener('focusin', showSortOptions);
  sortBtn.addEventListener('focusout', hideSortOptions);

  setLsEntryValues();
  const ls = window.localStorage;
  let booksArr = JSON.parse(ls.getItem('books'));
  const categories = JSON.parse(ls.getItem('categories'));

  displayBooks(booksArr);
  displayCategories(categories);
  displayFilterOptions(booksArr, categories)
  setBookCounter();
  hookFilterCategoriesInputs();

});
