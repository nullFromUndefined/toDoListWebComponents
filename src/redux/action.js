import { CREATE_TASK, DELETE_TASK, CLOSE_TASK, HIDE_CLOSED_TASK, RETURN_OPEN_TASK } from './types'

export function createTask(data) {
    return { type: CREATE_TASK , payload: data };
}

export function deleteTask(data) {
    return { type: DELETE_TASK, payload: data };
}

export function closeTask(data) {
    return { type: CLOSE_TASK, payload: data };
}
