const xmlns = 'http://www.w3.org/2000/svg';
const xlinkns = 'http://www.w3.org/1999/xlink';

const addItem = (itemText) => {
  var ul = document.getElementById("todo__items-container");
  var li = document.createElement("li");

  li.setAttribute('id', `item__${itemText}`);

  li.innerHTML = '<div class="todo__toggle">'
    + `<svg id="circle_item__${itemText}" height="100" width="100">`
    + '  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill="white" />'
    + '</svg>'
    + '</div>'
    + `<div class="todo__text"> ${itemText} </div>`
    + `<div id="delete_item__${itemText}" class="todo__delete">`
    + '  <svg class="icon" viewBox="0 0 154 154">'
    + '    <use xlink:href="#icon-delete"></use>'
    + '  </svg>'
    + '</div>';

  ul.appendChild(li);

  addDeleteEventListener(itemText);
  addCheckEventListener(itemText);
};

const addItemFromInput = (input) => {
  if (input && !checkIfItemExistis(input)) {
    var ul = document.getElementById("todo__items-container");
    var li = document.createElement("li");

    li.setAttribute('id', `item__${input}`);

    li.innerHTML = '<div class="todo__toggle">'
      + `<svg id="circle_item__${input}" height="100" width="100">`
      + '  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill="white" />'
      + '</svg>'
      + '</div>'
      + `<div class="todo__text"> ${input} </div>`
      + `<div id="delete_item__${input}" class="todo__delete">`
      + '  <svg class="icon" viewBox="0 0 154 154">'
      + '    <use xlink:href="#icon-delete"></use>'
      + '  </svg>'
      + '</div>';

    ul.appendChild(li);

    clearTextArea();
    addDeleteEventListener(input);
    addCheckEventListener(input);
  }
};

const clearTextArea = () => {
  todo__input.value = "";
}

const checkItem = (input) => {
  var item = document.getElementById(`item__${input}`);

  item.firstElementChild.innerHTML = `<svg id="checked_item__${input}" class="icon icon-checkmark" viewBox="0 0 26 26">`
    + '<use xlink:href="#icon-checkmark"></use>'
    + '</svg>';

  item.setAttribute('class', 'todo__item--done');

  addUncheckEventListener(input);
}

const uncheckItem = (input) => {
  var item = document.getElementById(`item__${input}`);

  item.firstElementChild.innerHTML = `<svg id="circle_item__${input}" height="100" width="100">`
    + '  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill="white" />'
    + '</svg>';

  item.classList.remove('todo__item--done');

  addCheckEventListener(input);
  addDeleteEventListener(input);
}

const addDeleteEventListener = (input) => {
  document
    .getElementById(`delete_item__${input}`)
    .addEventListener('click', () => deleteItem(input), true);
}

const addCheckEventListener = (input) => {
  document
    .getElementById(`circle_item__${input}`)
    .addEventListener('click', () => checkItem(input));
}

const addUncheckEventListener = (input) => {
  document
    .getElementById(`checked_item__${input}`)
    .addEventListener('click', () => uncheckItem(input));
}

const deleteItem = (input) => {
  document.getElementById(`item__${input}`).remove();
}

const checkIfItemExistis = (input) => {
  var listElements = document.getElementById("todo__items-container").getElementsByTagName("li");

  input = `item__` + input;

  for (var i = 0; (li = listElements[i]); i++) {
    if (li.id == input) {
      displayWarning();
      return true;
    }
  }

  return false;
}

const displayWarning = () => {
  var todo__toast = document.getElementById('todo__toast');
  todo__toast.setAttribute('class', 'toast fade show');

  setTimeout(function () {
    todo__toast.setAttribute('class', 'toast hide');
  }, 5000);
}

const setDate = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const today = new Date();

  var date__string = monthNames[today.getMonth()] + ' ' + today.getDate() + `, ` + today.getFullYear();

  document.getElementById('todo__weekday').innerHTML = days[today.getDay()];
  document.getElementById('todo__fulldate').innerHTML = date__string;
}

addEventListener('load', () => {
  addItem('Buy Groceries');
  addItem('Do homework');
  addItem('Call mom');

  const todo__input = document.querySelector('.todo__input');

  todo__input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      addItemFromInput(todo__input.value);
    }
  });

  document
    .querySelector('.todo__create')
    .addEventListener('click', () => addItemFromInput(todo__input.value));

  setDate();
});
