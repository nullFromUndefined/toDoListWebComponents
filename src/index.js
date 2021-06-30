import { createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { changeTitleElement } from './helpers';
import './styles.css';
import './webComponents';

const taskInWorked = document.querySelector('#worked ul');
const closedTask = document.getElementById('closedTask');
const openCloseTasksButton = document.getElementById('openCloseTasks');

// создаем глобальный state
export const store = createStore(rootReducer);


// подписываемся на события изменения store
store.subscribe(() => {
    const valueState = store.getState();
    taskInWorked.innerHTML = "";
    closedTask.innerHTML = "";
    valueState.openTasks.forEach((element) => {
        if (element.open) renderTasks(taskInWorked, element.title, element.id, element.open);
        if (openCloseTasksButton.dataset.openBlock == "true") {
            if (!element.open) renderTasks(closedTask, element.title, element.id, element.open);
        }
    });
})

// инициализируем state
store.dispatch({type: 'INIT_APPLICATION'});

document.getElementById('container').addEventListener('click', (event) => {
    if (event.target.dataset.openBlock === 'false') {
        changeTitleElement(openCloseTasksButton, 
            "Показать завершенные дела", 
            "Скрыть завершенные задачи");
        event.target.dataset.openBlock = 'true';
        const valueState = store.getState();
        taskInWorked.innerHTML = "";
        closedTask.innerHTML = "";
        valueState.openTasks.forEach((element) => {
            if (element.open) renderTasks(taskInWorked, element.title, element.id, element.open);
            if (!element.open) renderTasks(closedTask, element.title, element.id, element.open);
        });
    }
    else if (event.target.dataset.openBlock === 'true') {
        changeTitleElement(openCloseTasksButton, 
            "Скрыть завершенные задачи", 
            "Показать завершенные дела");
        event.target.dataset.openBlock = 'false';
        closedTask.innerHTML = "";
    }
})

function renderTasks(parentElem, childElem, id, isOpen) {
    const taskElem = document.createElement('task-item');
    taskElem.setAttribute('title', childElem);
    taskElem.setAttribute('isopen', isOpen);
    taskElem.setAttribute('id', id);
    parentElem.append(taskElem);
}
