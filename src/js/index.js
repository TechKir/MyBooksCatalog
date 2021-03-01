import { displayFilterOptions, hookFilterCategoriesInputs } from './filter';
import { displayBooks, displayCategories } from './display';
import { setBookCounter, setLsEntryValues } from './tools';
import { showSortOptions, hideSortOptions } from './sort';
import { addBook, addCategory, removeAllBooks, printList } from './service';

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
  const booksArr = JSON.parse(ls.getItem('books'));
  const categories = JSON.parse(ls.getItem('categories'));

  displayBooks(booksArr);
  displayCategories(categories);
  displayFilterOptions(booksArr, categories);
  setBookCounter();
  hookFilterCategoriesInputs();
});
