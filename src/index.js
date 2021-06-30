import { createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { createTask } from './redux/action';
import './styles.css';
import './webComponents';

const taskInWorked = document.getElementById('worked');
const closedTask = document.getElementById('closedTask');
const openCloseTasksButton = document.getElementById('openCloseTasks');
const input = document.getElementById('input');


// создаем глобальный state
export const store = createStore(rootReducer);


// подписываемся на события изменения store
store.subscribe(() => {
    const valueState = store.getState();
    taskInWorked.innerHTML = "";
    closedTask.innerHTML = "";
    valueState.openTasks.forEach((element) => {
        if (element.open) render(taskInWorked, element.title, element.id, element.open);
        if (openCloseTasksButton.dataset.openBlock == "true") {
            if (!element.open) render(closedTask, element.title, element.id, element.open);
        }
    });
})

// инициализируем state
store.dispatch({type: 'INIT_APPLICATION'});

function render(parentElem, childElem, id, isOpen) {
    const taskElem = document.createElement('task-card');
    taskElem.setAttribute('title', childElem);
    taskElem.setAttribute('isopen', isOpen);
    taskElem.setAttribute('id', id);
    parentElem.append(taskElem);
}

document.getElementById('container').addEventListener('click', (event) => {
    if (event.target.dataset.action === 'createTask') {
        store.dispatch(createTask(input.value));
    }
    else if (event.target.dataset.openBlock === 'false') {
        event.target.dataset.openBlock = 'true';
        const valueState = store.getState();
        taskInWorked.innerHTML = "";
        closedTask.innerHTML = "";
        valueState.openTasks.forEach((element) => {
            if (element.open) render(taskInWorked, element.title, element.id, element.open);
            if (!element.open) render(closedTask, element.title, element.id, element.open);
        });
    }
    else if (event.target.dataset.openBlock === 'true') {
        event.target.dataset.openBlock = 'false';
        closedTask.innerHTML = "";
    }
})
