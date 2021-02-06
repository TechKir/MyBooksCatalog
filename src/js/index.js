document.addEventListener('DOMContentLoaded', function () {

  const addBookForm = document.getElementById('addBookForm');
  addBookForm.addEventListener('submit', addBook);

  const bookList = document.getElementById('#book-list');
  const booksQuantity = document.getElementById('booksQuantity');

  function addBook(e) {
    e.preventDefault();

    //Take all the data from form:
    const data = new FormData(addBookForm);
    const inputsData = {};
    for (const entry of data) {
      inputsData[entry[0]] = entry[1];
    };

    //Short and fast inputs validation:
    if (inputsData.title.length < 1) {
      window.alert('It is necessery to write the title');
      return
    } else if (inputsData.author < 1) {
      window.alert('It is necessery to write an author');
      return
    } else if (inputsData.category === undefined) {
      window.alert('It is necessery to select category');
      return
    } else if (inputsData.priority === undefined) {
      window.alert('It is necessery to choose a book priority');
      return
    };

    const row = document.createElement('tr');
    const index = booksCounter();

    row.innerHTML = `
          <td class='table__td'>${inputsData.title}</td>
          <td class='table__td'>${inputsData.author}</td>
          <td class='table__td'>${inputsData.category}</td>
          <td class='table__td'>${inputsData.priority}</td>
          <td class='table__td'>
            <button class="btn btnCorrectColors">Edit</button>
            <button id=${index} class="btn btnCorrectColors">X</button>
          </td>
        `;

    bookList.appendChild(row);

    const deleteBtn = document.getElementById(index);
    deleteBtn.addEventListener('click', deleteBook);

    function deleteBook() {
      row.remove();
      setBookCounter();
    };

    setBookCounter();
  };

  function booksCounter() {
    const tr = document.querySelectorAll('tr');
    return tr.length - 1;
  };

  function setBookCounter() {
    booksQuantity.innerHTML = `Books quantity: ${booksCounter()}`;
  };

});