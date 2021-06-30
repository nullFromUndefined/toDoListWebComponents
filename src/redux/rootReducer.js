import { CREATE_TASK, DELETE_TASK, CLOSE_TASK } from './types'


let count = 0;
const initialState = {
    singleTask: {
        open: true,
        title: 'Купить хлеб',
        id: count
    },
    openTasks: [],
}

export function rootReducer(state = initialState, action) {
    if (action.type === CREATE_TASK) {
        const openTasks = [ ...state.openTasks, {
            open: true,
            id: count++,
            title: action.payload
        } ]
        return { ...state, openTasks }
    } else if (action.type === DELETE_TASK) {
        const openTasks = state.openTasks.filter((el) => {
            return el.id != action.payload
        })
        return { ...state, openTasks };
    } else if (action.type === CLOSE_TASK) {
        const openTasks = state.openTasks.map((el) => {
            if (el.id == action.payload) el.open = false;
            return el
        })
        return { ...state, openTasks };
    }
    return state
}
