// MVC = Model View Controller
// View => user interface
// Model => retrieve data, store data, modify data & update the View
// Controller => manage data & handle users' actions


// IIFE
const Api =(()=>{
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const getData = fetch(url).then((res) => res.json()).catch();
    const deletData = fetch(url, {method:'DELETE'})

    return {
        getData     // Promise
    }
})();

const View = (() => {
    let domSelector = {
        todoContainer: ".todo-list",
        complContainer: ".complete-list",
        inputBox: ".user-input",
        btn:".addBtn"
    }
    
    // console.log(document.getElementsByClassName(container));
    // console.log(document.querySelector('.todo-container'));
    
    const creatTmp = (arr)=>{
        let template = '';
        arr.forEach((todo) => {
            template += `<li>
                <span>${todo.id}</span>
                <span>${todo.title}</span>
                <button id="del">Completed</button>
            </li>`;
        });
        return template;
    }
    
    const render = (ele, template)=>{
        ele.innerHTML = template;
    }

    return {
        domSelector,
        creatTmp,
        render
    }
})();

const Model = ((api, view)=>{
    const { domSelector, creatTmp, render } = view;
    const { getData } = api;

    class State{
        constructor(){
            this._todoList = [];
            this._completedList = []
        }

        get getTodoList(){
            return this._todoList;
        }

        get completedList() {
            return this._completedList
        }

        set newTodoList(newList){
            this._todoList = newList;
            let todoCont = document.querySelector(domSelector.todoContainer);
            let tmp = creatTmp(this._todoList);
            render(todoCont, tmp);
        }

        set newCompletedList(newList){
            this._completedList = newList;
            let complCont = document.querySelector(domSelector.complContainer);
            let tmp = creatTmp(this._completedList);
            render(complCont, tmp);
        }
    }
    return {
        State,
        getData
    }
})(Api, View);

const Controller = ((view, model)=>{
    const { domSelector } = view;
    const { State, getData } = model;

    const state = new State();
    const init = () => {
        getData.then((data) => {
            state.newTodoList = data;
            state.newCompletedList = []
        });
    }

    // Add event listeners
    const addTodo = () => {
        const userInput = document.querySelector(domSelector.inputBox);
        const btn = document.querySelector(domSelector.btn);
        
        btn.addEventListener('click', ()=>{
            let item = {
                title: userInput.value,
                id: Math.floor(Math.random()*100) + 200
            };
            const newList = [item, ...state.getTodoList];
            state.newTodoList = newList;
            userInput.value="";
        })
    }


    const completeTodo = () => {
        const todoCont = document.querySelector(domSelector.todoContainer);
        const complCont = document.querySelector(domSelector.complContainer);
        todoCont.addEventListener('click', (event) => {
            if (event.target.id === 'del') {
                const todoId = parseInt(event.target.parentNode.querySelector('span').innerText);
                const todoTitle = event.target.parentNode.querySelector('span:nth-child(2)').innerText;
                console.log(todoId, todoTitle)
                const newList = state.getTodoList.filter((todo) => todo.id !== todoId);
                state.newTodoList = newList;
                const newCompList = [
                    { title: todoTitle, id: todoId },
                    ...state.completedList
                  ];
                  state.newCompletedList = newCompList;
            }
        });
    }
    
    // wrap all function
    const bootstrap = ()=>{
        init();
        addTodo();
        completeTodo();
    }

    return {
        bootstrap,
    }
    
})(View, Model);

Controller.bootstrap();