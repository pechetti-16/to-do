import {
  ADD_TASK,
  DELETE_TASK,
  SET_AUTHENTICATED,
  TOGGLE_TASK_COMPLETION,
  TOGGLE_TASK_IMPORTANCE,
  SET_CURRENT_DATE,
  SET_USERNAME,
} from "./actions";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  isAuthenticated: false,
  currentDate: new Date().toLocaleDateString(), // Initialising with today's date
  username: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };
    case TOGGLE_TASK_IMPORTANCE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, important: !task.important }
            : task
        ),
      };
    case TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload }; // Store username
    default:
      return state;
  }
};

export default reducer;
