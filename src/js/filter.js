/* eslint-disable no-unused-expressions */
const filterByAuthorSelect = document.getElementById('filterByAuthor');
const filterByCategoryLi = document.getElementById('filterByCategory');
const filterPrioritiesInputs = document.querySelectorAll('.filterBox li:last-child label input');
const filterAuthorSelect = document.querySelector('.filterBox li:first-child select');

let filterCategoriesInputs;
filterPrioritiesInputs.forEach((input) => {
  input.addEventListener('change', booksFilter);
});

let authorSelected = null;
let authorSelectedArr = [];
let checkedPriorities = [];
let checkedCategories = [];

filterAuthorSelect.addEventListener('change', booksFilter);

function displayFilterOptions(books, categories) {
  const option = document.createElement('option');
  option.setAttribute('value', 'empty');
  filterByAuthorSelect.appendChild(option);

  books.forEach((book) => {
    const option = document.createElement('option');
    option.setAttribute('value', book.author);
    option.innerHTML = book.author;
    filterByAuthorSelect.appendChild(option);
  });

  categories.forEach((category) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');

    span.innerHTML = `${category} &nbsp &nbsp`;
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', category);
    label.setAttribute('class', 'filterBox__label');
    label.appendChild(input);
    label.appendChild(span);
    filterByCategoryLi.appendChild(label);
  });
}

function hookFilterCategoriesInputs() {
  filterCategoriesInputs = document.querySelectorAll('.filterBox li:nth-child(2) label input');
  filterCategoriesInputs.forEach((input) => {
    input.addEventListener('change', booksFilter);
  });
}

function booksFilter(e) {
  const allBooksTr = document.querySelectorAll('#book-list tr');

  try {
    authorSelected = e.target.options[e.target.selectedIndex].value; // if this line cause error below author array reset not execiute
    authorSelectedArr = [];
    authorSelectedArr.push(authorSelected);
    if (authorSelected === 'empty') {
      authorSelectedArr = [];
    }
  } catch {
    null;
  }

  if (e) {
    if (e.target.checked) {
      e.target.value.length > 1
        ? checkedCategories.push(e.target.value)
        : checkedPriorities.push(e.target.value);
    } else if (!e.target.checked) {
      checkedPriorities = checkedPriorities.filter((value) => {
        return value !== e.target.value;
      });
      checkedCategories = checkedCategories.filter((value) => {
        return value !== e.target.value;
      });
    }
  }

  allBooksTr.forEach((tr) => {
    if (
      checkedPriorities.length === 0 &&
      checkedCategories.length === 0 &&
      authorSelectedArr.length === 0
    ) {
      tr.removeAttribute('style');
    } else {
      const isTrHasPriority = checkedPriorities.some((value) => {
        return value === tr.getAttribute('data-priority');
      });
      const isTrHasCategory = checkedCategories.some((value) => {
        return value === tr.getAttribute('data-category');
      });

      switch (true) {
        case checkedCategories.length > 0 &&
          checkedPriorities.length > 0 &&
          authorSelectedArr.length > 0:
          !isTrHasPriority ||
          !isTrHasCategory ||
          tr.getAttribute('data-author') !== authorSelectedArr[0]
            ? tr.setAttribute('style', 'display:none')
            : tr.removeAttribute('style');
          break;
        case authorSelectedArr.length > 0 && checkedPriorities.length > 0:
          !isTrHasPriority || tr.getAttribute('data-author') !== authorSelectedArr[0]
            ? tr.setAttribute('style', 'display:none')
            : tr.removeAttribute('style');
          break;
        case authorSelectedArr.length > 0 && checkedCategories.length > 0:
          !isTrHasCategory || tr.getAttribute('data-author') !== authorSelectedArr[0]
            ? tr.setAttribute('style', 'display:none')
            : tr.removeAttribute('style');
          break;
        case checkedCategories.length > 0 && checkedPriorities.length > 0:
          !isTrHasPriority || !isTrHasCategory
            ? tr.setAttribute('style', 'display:none')
            : tr.removeAttribute('style');
          break;
        case authorSelectedArr.length > 0:
          tr.getAttribute('data-author') !== authorSelectedArr[0]
            ? tr.setAttribute('style', 'display:none')
            : tr.removeAttribute('style');
          break;
        case checkedPriorities.length === 0:
          !isTrHasCategory ? tr.setAttribute('style', 'display:none') : tr.removeAttribute('style');
          break;
        case checkedCategories.length === 0:
          !isTrHasPriority ? tr.setAttribute('style', 'display:none') : tr.removeAttribute('style');
          break;
        case authorSelectedArr.length === 0:
          tr.removeAttribute('style');
          break;
        default:
          break;
      }
    }
  });
}

function resetFilters() {
  const prioritiesinputs = document.querySelectorAll('#filterByPriorities input');
  prioritiesinputs.forEach((input) => {
    input.checked = false;
  });

  const categoriesinputs = document.querySelectorAll('#filterByCategory input');
  categoriesinputs.forEach((input) => {
    input.checked = false;
  });

  const authorsOptions = document.querySelectorAll('#filterByAuthor option');
  authorsOptions.forEach((option) => {
    option.selected = false;
  });

  authorsOptions[0].selected = true;

  checkedPriorities = [];
  checkedCategories = [];
  booksFilter();
}

export { displayFilterOptions, hookFilterCategoriesInputs, booksFilter, resetFilters };
