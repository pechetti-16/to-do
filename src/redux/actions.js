export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const TOGGLE_TASK_IMPORTANCE = "TOGGLE_TASK_IMPORTANCE";
export const SET_CURRENT_DATE = "SET_CURRENT_DATE";
export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
export const SET_USERNAME = "SET_USERNAME";

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});
export const setAuthenticated = (auth) => ({
  type: SET_AUTHENTICATED,
  payload: auth,
});
export const toggleTaskImportance = (taskId) => ({
  type: TOGGLE_TASK_IMPORTANCE,
  payload: taskId,
});
export const toggleTaskCompletion = (id) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: id,
});
export const setCurrentDate = (date) => ({
  type: SET_CURRENT_DATE,
  payload: date,
});
