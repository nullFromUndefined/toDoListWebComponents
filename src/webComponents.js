import { store } from './index';
import { deleteTask, closeTask, createTask } from './redux/action';

// Создание веб компонетов
// подключение элемнета в теге template
const template = document.querySelector('template');
const templateClone = document.importNode(template.content, true);
document.getElementById('input-group').appendChild(templateClone);


// Создание веб компонетов
// создаем кастомный элемент task-card с shadow Dom
// <task-card title="Купить хлеб" id="12" isopen="true"></task-card>
customElements.define('task-item', class extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({mode: 'open'});
  
      shadow.innerHTML = `
          <style>
              .list-group-item {
                  border-top-width: 0;
                  position: relative;
                  display: block;
                  padding: .75rem 1.25rem;
                  background-color: #fff;
                  border: 1px solid rgba(0,0,0,.125);
              }
              .redButton {
                  display: none;
                  position: absolute;
                  left: 5px;
                  top: 5px;
                  color: white;
                  width: 50%;
                  text-align: center;
                  background-color: #ffc107;
                  border-color: #ffc107;
                  border: 1px solid transparent;
                  padding: .375rem .75rem;
                  font-size: 1rem;
                  line-height: 1.5;
                  border-radius: .25rem;
                  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                  overflow: visible;
              }
              
              .yellowButton {
                  display: none;
                  position: absolute;
                  right: 5px;
                  top: 5px;
                  width: 45%;
                  text-align: center;
                  color: white;
                  background-color: #ff2c07;
                  border-color: #ff2c07;
                  border: 1px solid transparent;
                  padding: .375rem .75rem;
                  font-size: 1rem;
                  line-height: 1.5;
                  border-radius: .25rem;
                  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                  overflow: visible;
              }
              
              .list-group-item:hover button {
                  display: block;
              }
          </style>
      
          <li class="list-group-item">
          ${this.getAttribute('title')}
          <button ${this.getAttribute('isopen') === 'true'  ? '' : 'style="display: none;"'} 
              class="redButton" 
              data-action="closeTask" 
              data-id-worked-task="${this.getAttribute('id')}">
                  Завершено
          </button>
          <button 
              class="yellowButton" 
              data-action="deleteTask" 
              data-id-worked-task="${this.getAttribute('id')}">
                  Удалить задачку
          </button>
      
          </li>`;
  
      shadow.addEventListener('click', event => {
          event.stopPropagation();
          if (event.target.dataset.action === 'deleteTask') {
              store.dispatch(deleteTask(event.target.dataset.idWorkedTask));
          } else if (event.target.dataset.action === 'closeTask') {
              store.dispatch(closeTask(event.target.dataset.idWorkedTask));
          }
      });
    }
  });


// <task-list></task-list>
  customElements.define('task-list', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
          <style>
              .list-group {
                display: flex;
                flex-direction: column;
                padding-left: 0;
                margin-bottom: 0;
                margin-top: 0;
                box-sizing: border-box;
              }
          </style>
          <ul class="list-group">
          </ul>
      `;
    }
  });

//  <input-task></input-task>
  customElements.define('input-task', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
          <div class="input-group mb-3">
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" id="button-add-task" data-action="createTask">Добавить задачу</button>
            </div>
                <input type="text" class="form-control" placeholder="" id="input">
          </div>
      `;
      this.addEventListener('click', (event) => {
        const input = document.getElementById('input');
        if (event.target.dataset.action === 'createTask') {
            if (input.value.trim()) store.dispatch(createTask(input.value));
        }
    })
    }
  });