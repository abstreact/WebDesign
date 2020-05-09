//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

const texts = ['Todo list','lista per tu bere',""];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type(){
    if(count === texts.length){
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0,++index);

    document.querySelector('.typing').textContent = letter;
    if(letter.length === currentText.length){
        count++;
        index = 0;
    }
    setTimeout(type,400);
}());

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event){
    //prevent from submitting
    event.preventDefault();
    //Todo DIV that is created after all elements in
    //our HTML code so we need to position it where we want
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    //Set text of LI
    newTodo.innerText = todoInput.value;
    //Add a class name to the newTodo-li
    newTodo.classList.add('todo-item');
    //add the LI to the DIV created above as a child
    todoDiv.appendChild(newTodo);
    //ADD TO DO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //Check mark Button
    const completedButton = document.createElement('button');
    //create a logo inside of the button that we created above
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    //add a classname to the button 
    completedButton.classList.add('complete-btn');
    //add that button to the div that we are working rn TODODIV
    todoDiv.appendChild(completedButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append DIV to List
    todoList.appendChild(todoDiv);
    
    //Clear Todoinput value
    todoInput.value="";
}

function deleteCheck(event){
    //prints out what are you clicking from the eventListener
    //console.log(event.target)
    //returns the item that we are clicking

    //remove the item
    //this returns the item that u cliked
    const item = event.target;
    //we than check for the first element class name if we clicked 
    //the button with the classname trash-btn
    if(item.classList[0] === "trash-btn"){
        //go to the parent of the element we just clicked to be able to delete it
        const todo = item.parentElement;
        //add the transition when deleted
        //but when we have the .remove() it removes it right away
        //we add a eventlistener to listen when the transition is over
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
        
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        //makes the element take this other classname and than we
        //modify it using css with that classname SIMPLE
        todo.classList.toggle('completed')
    }
}
function filterTodo(event){
    //gets all added todo items
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        //this will check the value selected on the Select item list ALL/Comp/Uncomp/
        switch(event.target.value){
            //if All selected set all items display value to visible
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                //if an item class is completed = set display:flex wich shows them
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                //else not = set them to none -- dont show them
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            
        }
    })
    
}

function saveLocalTodos(todo){
    //Check if the 
    let todos;
    //checks if we have something in the LocalStorage
    //if we dont we create a new array to later fill in the (todo)
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        //if something is present in the localStorage
        //than we get the data and assign as an array
        //that we later push data into it
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //this is the part where we push the data into array
    //
    todos.push(todo);
    //this sets the todos array back to the localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    //checks if we have something in the LocalStorage
    //if we dont we create a new array to later fill in the (todo)
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        //if something is present in the localStorage
        //than we get the data and assign as an array
        //that we later push data into it
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV that is created after all elements in
    //our HTML code so we need to position it where we want
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    //Set text of LI
    newTodo.innerText = todo;
    //Add a class name to the newTodo-li
    newTodo.classList.add('todo-item');
    //add the LI to the DIV created above as a child
    todoDiv.appendChild(newTodo);
    //Check mark Button
    const completedButton = document.createElement('button');
    //create a logo inside of the button that we created above
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    //add a classname to the button 
    completedButton.classList.add('complete-btn');
    //add that button to the div that we are working rn TODODIV
    todoDiv.appendChild(completedButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append DIV to List
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    //checks if we have something in the LocalStorage
    //if we dont we create a new array to later fill in the (todo)
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        //if something is present in the localStorage
        //than we get the data and assign as an array
        //that we later push data into it
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //todo = returns the class
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}