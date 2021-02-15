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

document.addEventListener('DOMContentLoaded', () => {

  const addBookForm = document.getElementById('addBookForm');
  const bookList = document.getElementById('book-list');
  const modalContainer = document.getElementById('modalContainer');
  const booksQuantity = document.getElementById('booksQuantity');
  const removeList = document.getElementById('removeAllBooks');
  const printBtn = document.getElementById('print');
  const categoriesList = document.getElementById('categoriesId');
  const categorySelect = document.getElementById('categorySelect');
  const addNewCategory = document.getElementById('addNewCategory');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const radioInputs = document.querySelectorAll('.formBox__radio');
  const sortBtn = document.getElementById('sort');
  const sortModalId = document.getElementById('sortModalId');
  const sortByTitleBtn = document.getElementById('sortByTitle');
  const sortByAuthorBtn = document.getElementById('sortByAuthor');
  const sortByCategoryBtn = document.getElementById('sortByCategory');
  const sortByPriorityBtn = document.getElementById('sortByPriority');

  addBookForm.addEventListener('submit', addBook);
  removeList.addEventListener('click', removeAllBooks);
  printBtn.addEventListener('click', printList);
  addNewCategory.addEventListener('click', addCategory);

  // SORT LOGIC //
  sortBtn.addEventListener('focusin', showSortOptions);
  sortBtn.addEventListener('focusout', hideSortOptions);
  sortByTitleBtn.addEventListener('click', function (){
    sortBooks('title');
  });
  sortByAuthorBtn.addEventListener('click', function (){
    sortBooks('author');
  });
  sortByCategoryBtn.addEventListener('click', function (){
    sortBooks('category');
  });
  sortByPriorityBtn.addEventListener('click', function (){
    sortBooks('priority');
  });

  // TAKES BOOKS FROM LOCAL STORAGE AND DISPLAY THEM //
  const ls = window.localStorage;
  if (ls.getItem('books') === null){
    ls.setItem('books', JSON.stringify([]));
  };
  if (ls.getItem('categories') === null){
    ls.setItem('categories', JSON.stringify(['crime', 'sci-fi', 'fantasy', 'poem', 'drama', 'science']));
  };

  let booksArr = JSON.parse(ls.getItem('books'));
  displayBooks(booksArr);

  const categories = JSON.parse(ls.getItem('categories'));
  displayCategories(categories);

  setBookCounter();

  // //////////////////// FUNCTIONS ////////////////////////

  function showSortOptions () {
    sortModalId.style.display = 'inline-block';
  }

  function hideSortOptions () {
    setTimeout( function () {
      sortModalId.style.display = 'none'
    }, 100)
  }

  function sortBooks (sortBy) {
    if (sortBy === 'priority') {
      booksArr.sort( function (bookA, bookB){
        if (bookA[sortBy] > bookB[sortBy]) return -1;
        if (bookA[sortBy] < bookB[sortBy]) return 1;
        return 0
      })
    } else {
      booksArr.sort( function (bookA, bookB){
        if (bookA[sortBy] > bookB[sortBy]) return 1;
        if (bookA[sortBy] < bookB[sortBy]) return -1;
        return 0
      })
    }
    ls.setItem('books', JSON.stringify(booksArr));
    displayBooks(booksArr);
  }

  function displayCategories(categories) {
    // ADD DEFAULT FIRST OPTION:
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'none');
    defaultOption.setAttribute('selected', 'selected');
    defaultOption.setAttribute('disabled', 'disabled');
    defaultOption.setAttribute('hidden', 'hidden');
    defaultOption.innerHTML = 'Select an Option';
    categorySelect.appendChild(defaultOption);

    categories.forEach( function (category, index){
      const li = document.createElement('li');
      
      li.innerHTML = `
        ${category}:<p id=${category + index}>${countCategory(category)}</p>
      `;

      const option = document.createElement('option');
      option.setAttribute('value', category)
      option.innerHTML = `
        ${category}
      `;

      categoriesList.appendChild(li)
      categorySelect.appendChild(option);
    })
  };

  function countCategory(category){
    let sum = 0;
    booksArr.forEach( function (book){
      if (book.category === category){
        sum++
      }
    })
    return sum;
  }

  function addCategory() {
    // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
    categoriesList.innerHTML = '';
    categorySelect.innerHTML = '';

    const category = window.prompt('Add new category');
    if (category === null){
      displayCategories(categories);
      return
    }
    categories.push(category);
    ls.setItem('categories', JSON.stringify(categories));
    displayCategories(categories);
  }

  function displayBooks(books) {
    // CLEAR ALL BOOKLIST AND MODALS CONTENT TO INIT FRESH BOOK LIST:
    bookList.innerHTML = '';
    modalContainer.innerHTML = '';

    // DYNAMIC DISPLAY ALL BOOKS WITH EDIT/DELETE OPTION AND THEIR EDIT MODALS //
    books.forEach( function(book, index){
      const row = document.createElement('tr');

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
                <input class='formBox__dataArea modalWidthCorrect' name='title' type="text" placeholder="Write the title" value='${book.title}'>
              </div>
              <div class="formBox__inputBox">
                <label for="author">Author:</label>
                <input class='formBox__dataArea modalWidthCorrect' name='author' type="text" placeholder="Write an author" value='${book.author}'>
              </div>
              <div class="formBox__inputBox">
                <label for="category">Category:</label>
                <select class='formBox__dataArea modalWidthCorrect' id="category" name='category'>
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
        displayCategories(categories);
        setBookCounter();
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
        for (const entry of editedData) {
          inputsEditedData[entry[0]] = entry[1];
        }

        if (validate(inputsEditedData) === false){
          return // VALIDATION NOT PASS - CLOSEING FUNCTION
        }

        booksArr[index] = inputsEditedData; // REPLACE EDITED BOOK DATA

        modal.style.display = 'none';
        ls.setItem('books', JSON.stringify(booksArr));
        displayBooks(booksArr);

        // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
        categoriesList.innerHTML = '';
        categorySelect.innerHTML = '';
        displayCategories(categories);
      }

      setBookCounter();
    })
  }

  function addBook(e) {
    e.preventDefault();

    // TAKE ALL THE DATA FROM FORM:
    const data = new FormData(addBookForm);
    const inputsData = {};
    for (const entry of data) {
      inputsData[entry[0]] = entry[1];
    };

    if (validate(inputsData) === false){
      return // VALIDATION NOT PASS - CLOSEING FUNCTION
    }
    
    booksArr.push(inputsData);
    ls.setItem('books', JSON.stringify(booksArr));

    setBookCounter();
    displayBooks(booksArr);

    // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
    titleInput.value = '';
    authorInput.value = '';
    radioInputs.forEach(function(radioBtn) {
      radioBtn.checked = false;
    })
    categoriesList.innerHTML = '';
    categorySelect.innerHTML = '';
    displayCategories(categories);
  };

  function removeAllBooks(){
    booksArr = [];
    ls.setItem('books', JSON.stringify(booksArr));
    displayBooks(booksArr);

    // CLEAR ALL CATEGORIES TO INIT FRESH LIST:
    categoriesList.innerHTML = '';
    categorySelect.innerHTML = '';
    displayCategories(categories);
    setBookCounter();
  }

  function printList (){
    window.print();
  };

  function booksCounter() {
    const trBook = document.querySelectorAll('tr');
    return trBook.length - 1; // We don't count first tr because it contains names of columns //
  };

  function setBookCounter() {
    booksQuantity.innerHTML = `Books quantity: ${booksCounter()}`;
  };

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
    };
    return true;
  }
});
