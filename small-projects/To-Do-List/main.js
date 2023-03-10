
// When the web page is loaded run this code
window.addEventListener('load', () => {


  // create a global variable which gets the local storage item
  // will be encoding it as a JSON string, so we use JSON.parse to unlock it
  todos = JSON.parse(localStorage.getItem('todos')) || []; // get item, or create new array
  const nameInput = document.querySelector('#name'); // # gets the id, query selector gets the first element that matches
  const newTodoForm = document.querySelector('#new-todo-form');


  // declare a username variable to place in storage
  const username = localStorage.getItem('username') || ''; // get username or create empty


  // set the value of the username to whatever is in the #name input field
  nameInput.value = username;



  // listen for any change, set the local storage to new name
  nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);
  })


  // Add new todo list to local storage when form is submitted
  newTodoForm.addEventListener('submit', e => {
    // prevent page refresh
    e.preventDefault();

    // create todo object
    const todo = {
      content: e.target.elements.content.value, // target the name="content" input
      category: e.target.elements.category.value, // target the name="category" input
      done: false,
      createdAt: new Date().getTime()
    }

    // validate todo input
    if (!todo.content.match(/\w/)) {
      e.target.reset();
      return alert("Invalid Entry");
    }

    //add new todo to the todos array
    todos.push(todo);

    // turns the array todo list into a JSON string, and stores it in local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // reset the form
    e.target.reset();

    // create the new todos
    DisplayTodos();
  })


  // adding filters
  const completeBtn = document.getElementById("complete-filter");
  completeBtn.addEventListener('click', e => {
    const tempTodos = todos;
    todos = todos.filter(t => t.done == true); // remove the one we selected
    localStorage.setItem('todos', JSON.stringify(todos));

    DisplayTodos();

    todos = tempTodos;
    localStorage.setItem('todos', JSON.stringify(todos));

    UpdateCounters();
  })

  const totalBtn = document.getElementById("total-filter");
  totalBtn.addEventListener('click', e => {
    localStorage.setItem('todos', JSON.stringify(todos));
    DisplayTodos();
  })

  const incompleteBtn = document.getElementById("incomplete-filter");
  incompleteBtn.addEventListener('click', e => {
    const tempTodos = todos;
    todos = todos.filter(t => t.done == false); // remove the one we selected
    localStorage.setItem('todos', JSON.stringify(todos));

    DisplayTodos();

    todos = tempTodos;
    localStorage.setItem('todos', JSON.stringify(todos));

    UpdateCounters();
  })

  DisplayTodos();
})


function DisplayTodos() {
  // access the todo list by getting its id
  const todoList = document.querySelector('#todo-list');

  // clear all elements when we call this function
  todoList.innerHTML = '';

  // sort array
  todos.sort((a, b) => {
    return a.done - b.done;
  })

  // loop through every todo in our todos array
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteBtn = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;

    // Add classes to appropriate elements
    span.classList.add('bubble');

    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteBtn.classList.add('delete');

    // Set inner HTML for elements
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

    // Append html elements for appropriate nesting
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    // add done class
    if (todo.done) {
      todoItem.classList.add('done');
    }

    // if the checkbox is clicked, update the stored value
    input.addEventListener('click', e => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      // Run this after every change we make
      DisplayTodos();
    })

    edit.addEventListener('click', e => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly'); // allow it to be edited
      input.focus(); // highlights the selected todo
      input.addEventListener('blur', e => { // if you click outside the todo, the run this
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      })
    })

    deleteBtn.addEventListener('click', e => {
      todos = todos.filter(t => t != todo); // remove the one we selected
      localStorage.setItem('todos', JSON.stringify(todos));
      DisplayTodos();
    })
  })

  UpdateCounters();
}


function UpdateCounters() {
  // Variables, get span elements by ID
  const completeCounter = document.getElementById('complete');
  const totalCounter = document.getElementById('total');
  const incompleteCounter = document.getElementById('incomplete');

  let completed = 0;
  let incomplete = todos.length;

  // Calculate how many are complete/incomplete
  todos.forEach(todo => {
    if (todo.done == true) {
      completed++;
      incomplete--;
    }
  })

  // Update the text
  completeCounter.innerHTML = `${completed}`;
  totalCounter.innerHTML = ` ${todos.length}`;
  incompleteCounter.innerHTML = ` ${incomplete}`;

}