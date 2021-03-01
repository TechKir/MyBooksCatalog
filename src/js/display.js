/* eslint-disable no-alert */
import { displayFilterOptions, hookFilterCategoriesInputs, resetFilters } from './filter';
import { countCategory, setBookCounter, validate, setLsEntryValues } from './tools';

const bookList = document.getElementById('book-list');
const modalContainer = document.getElementById('modalContainer');
const categoriesList = document.getElementById('categoriesId');
const categorySelect = document.getElementById('categorySelect');
const filterByAuthorSelect = document.getElementById('filterByAuthor');
const filterByCategoryLi = document.getElementById('filterByCategory');

setLsEntryValues();
const ls = window.localStorage;

function displayBooks(books) {
  const booksArr = JSON.parse(ls.getItem('books'));
  const categories = JSON.parse(ls.getItem('categories'));
  // CLEAR ALL BOOKLIST AND MODALS CONTENT TO INIT FRESH BOOK LIST:
  bookList.innerHTML = '';
  modalContainer.innerHTML = '';

  // DYNAMIC DISPLAY ALL BOOKS WITH EDIT/DELETE OPTION AND THEIR EDIT MODALS //
  books.forEach((book, index) => {
    const row = document.createElement('tr');

    row.setAttribute('data-title', book.title);
    row.setAttribute('data-author', book.author);
    row.setAttribute('data-category', book.category);
    row.setAttribute('data-priority', book.priority);

    row.innerHTML = `
      <td class='table__td'>${book.title}</td>
      <td class='table__td'>${book.author}</td>
      <td class='table__td'>${book.category}</td>
      <td class='table__td'>${book.priority}</td>
      <td class='table__td'>
          <button id=edit${index} class="btn btnCorrectColors">Edit</button>
          <button id=delete${index} class="btn btnCorrectColors">X</button>
        </td>
      `;

    bookList.appendChild(row);

    // ADD TO EVERY BOOK ROW INDIVIDUAL MODAL TO EDIT A BOOK:
    const modalContainer = document.getElementById('modalContainer');
    const modalElement = document.createElement('div');

    modalElement.innerHTML = `
        <div id="myModal${index}" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <div class='modal__closeBox'>
              <span id="close${index}"
              class="close">&times;</span>
            </div>
            
            <form id='editBookForm${index}' class="formBox">
              <div class="formBox__inputBox">
                <label for="title">Title:</label>
                <input class='formBox__dataArea modalWidthCorrect' name='title' type="text" placeholder="Write the title" 
                value='${book.title}'>
              </div>
              <div class="formBox__inputBox">
                <label for="author">Author:</label>
                <input class='formBox__dataArea modalWidthCorrect' name='author' type="text" placeholder="Write an author" 
                value='${book.author}'>
              </div>
              <div class="formBox__inputBox">
                <label for="category">Category:</label>
                <select class='formBox__dataArea modalWidthCorrect' name='category'>
                  <option value="crime" ${book.category === 'crime' && 'selected'}>
                  Crime</option>
                  <option value="sci-fi" ${book.category === 'sci-fi' && 'selected'}>
                  Sci-Fi</option>
                  <option value="fantasy" ${book.category === 'fantasy' && 'selected'}>
                  Fantasy</option>
                  <option value="poem" ${book.category === 'poem' && 'selected'}>Poem</option>
                  <option value="drama" ${book.category === 'drama' && 'selected'}>
                  Drama</option>
                  <option value="science" ${book.category === 'science' && 'selected'}>
                  Science</option>
                </select>
              </div>
              <div class="formBox__inputBox">
                <p>Priority:</p>
                <label class='formBox__label'>
                  <input class='formBox__radio' name='priority' value='1' type="radio"
                  ${book.priority === '1' && 'checked'}>&nbsp 1
                </label>
                <label class='formBox__label'>
                  <input class='formBox__radio' name='priority' value='2' type="radio"
                  ${book.priority === '2' && 'checked'}>&nbsp 2
                </label>
                <label class='formBox__label'>
                  <input class='formBox__radio' name='priority' value='3' type="radio"
                  ${book.priority === '3' && 'checked'}>&nbsp 3
                </label>
                <label class='formBox__label'>
                  <input class='formBox__radio' name='priority' value='4' type="radio"
                  ${book.priority === '4' && 'checked'}>&nbsp 4
                </label>
                <label class='formBox__label'>
                  <input class='formBox__radio' name='priority' value='5' type="radio"
                  ${book.priority === '5' && 'checked'}>&nbsp 5
                </label>
              </div>
              <input class='formBox__submit btn modalSubmitCorrect' type="submit" value="Edit book">
            </form>

          </div>
        </div>
      `;

    modalContainer.appendChild(modalElement);

    // DELETE BOOK //
    const deleteBtn = document.getElementById(`delete${index}`);
    deleteBtn.addEventListener('click', deleteBook);

    function deleteBook() {
      booksArr.splice(index, 1);

      ls.setItem('books', JSON.stringify(booksArr));
      displayBooks(booksArr);

      // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
      categoriesList.innerHTML = '';
      categorySelect.innerHTML = '';
      filterByAuthorSelect.innerHTML = '';
      filterByCategoryLi.innerHTML = 'categories: &nbsp';

      displayFilterOptions(booksArr, categories);
      displayCategories(categories);
      setBookCounter();

      hookFilterCategoriesInputs();
      resetFilters();
    }

    // EDIT BOOK //
    const modal = document.getElementById(`myModal${index}`);
    function openEditModal() {
      modal.style.display = 'block';
    }

    const closeModal = document.getElementById(`close${index}`);
    closeModal.addEventListener('click', closeEditForm);
    function closeEditForm() {
      modal.style.display = 'none';
    }

    const editBtn = document.getElementById(`edit${index}`);
    editBtn.addEventListener('click', openEditModal);

    // LISTENING FOR SUBMIT //
    const editBookForm = document.getElementById(`editBookForm${index}`);
    editBookForm.addEventListener('submit', editBook);

    function editBook(e) {
      e.preventDefault();

      // TAKE ALL THE DATA FROM EDITFORM:
      const editedData = new FormData(editBookForm);
      const inputsEditedData = {};

      [...editedData].forEach((entry) => {
        inputsEditedData[entry[0]] = entry[1];
      });

      if (validate(inputsEditedData) === false) {
        return; // VALIDATION NOT PASS - CLOSEING FUNCTION
      }

      booksArr[index] = inputsEditedData; // REPLACE EDITED BOOK DATA

      modal.style.display = 'none';
      ls.setItem('books', JSON.stringify(booksArr));
      displayBooks(booksArr);

      // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
      categoriesList.innerHTML = '';
      categorySelect.innerHTML = '';
      filterByAuthorSelect.innerHTML = '';
      filterByCategoryLi.innerHTML = 'categories: &nbsp';

      displayFilterOptions(booksArr, categories);
      displayCategories(categories);

      hookFilterCategoriesInputs();
      resetFilters();
    }

    setBookCounter();
  });
}

function displayCategories(categories) {
  // ADD DEFAULT FIRST EMPTY OPTION:
  const defaultOption = document.createElement('option');
  defaultOption.setAttribute('value', 'none');
  defaultOption.setAttribute('selected', 'selected');
  defaultOption.setAttribute('disabled', 'disabled');
  defaultOption.setAttribute('hidden', 'hidden');
  defaultOption.innerHTML = 'Select an Option';
  categorySelect.appendChild(defaultOption);

  categories.forEach((category, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
        ${category}:<p id=${category + index}>${countCategory(category)}</p>
        `;

    const option = document.createElement('option');
    option.setAttribute('value', category);
    option.innerHTML = `
        ${category}
        `;

    categoriesList.appendChild(li);
    categorySelect.appendChild(option);
  });
}

export { displayBooks, displayCategories };
