const addTodoListItem = () => {
    const listDiv = document.createElement('div')
    listDiv.setAttribute('class', 'todo-list-item')
    listDiv.innerHTML =  `
    <div class="todo-list-item-circe"><img src="./assets/svg/circle.svg" alt="circle" class="item-circe-img"></div>
    <span class="todo-list-item-text" role="textbox" contenteditable></span>`
    if (!editorMode) todoListMain.appendChild(listDiv)
    
    todoListCircleArr = [...document.getElementsByClassName('item-circe-img')]
    todoListMain.scrollTo({ top: todoListMain.scrollHeight, behavior: 'smooth' })
    removeTodoListItemBtn.classList.add('remove-todo-item-turned-on')
    removeTodoListItemBtn.style.cursor = 'pointer'
    todoListCircleArr[todoListCircleArr.length-1].addEventListener('click', (e) => {
        e.target.classList.toggle('todo-circle-checked')
        e.target.closest('.todo-list-item').querySelector('.todo-list-item-text').classList.toggle('todo-text-crossed')
        if (editorMode) {
             e.target.closest('.todo-list-item').remove()
            if (!document.querySelector('.todo-list-item')) {
                removeTodoListItemBtn.classList.remove('remove-todo-item-turned-on')
                removeTodoListItemBtn.style.cursor = 'default'
                editorMode = false
                textFieldsArr.map(el => el.contentEditable = true)
                todoListCircleArr.map(el => el.classList.toggle('todo-circle-delete'))
            }
        }
    })
}

const removeTodoListItem = () => {
    textFieldsArr = [...document.getElementsByClassName('todo-list-item-text')]
    if (editorMode) {
        editorMode = false
        textFieldsArr.map(el => el.contentEditable = true)
    } else {
       editorMode = true 
       textFieldsArr.map(el => el.contentEditable = false)
    }
    todoListCircleArr.map(el => el.classList.toggle('todo-circle-delete'))
}

const addTodoListItemBtn = document.querySelector(".add-todo-list-item-btn")
const todoListMain = document.querySelector('.todo-list-main')
const removeTodoListItemBtn = document.querySelector('.remove-todo-list-item-btn')
let todoListCircleArr = []
let textFieldsArr = []
let editorMode = false

const setLocalStorage = () => {localStorage.setItem('todoList', todoListMain.innerHTML)}
const showTodoListOnLoad = () => {
    todoListMain.innerHTML = localStorage.getItem('todoList')
    todoListCircleArr = [...document.querySelectorAll('.item-circe-img')]
    
    if (todoListCircleArr.length !== 0) {
        removeTodoListItemBtn.classList.add('remove-todo-item-turned-on')
        removeTodoListItemBtn.style.cursor = 'pointer'
    }
    todoListCircleArr.map(el => {
        el.addEventListener('click', (e) => {
            e.target.classList.toggle('todo-circle-checked')
            e.target.closest('.todo-list-item').querySelector('.todo-list-item-text').classList.toggle('todo-text-crossed')
            if (editorMode) {
                e.target.closest('.todo-list-item').remove()
                if (!document.querySelector('.todo-list-item')) {
                    removeTodoListItemBtn.classList.remove('remove-todo-item-turned-on')
                    removeTodoListItemBtn.style.cursor = 'default'
                    editorMode = false
                    textFieldsArr.map(el => el.contentEditable = true)
                    todoListCircleArr.map(el => el.classList.toggle('todo-circle-delete'))
                }
            }
        })
    }) 
}

export {addTodoListItem, addTodoListItemBtn, removeTodoListItemBtn, removeTodoListItem, setLocalStorage,
    showTodoListOnLoad
}