import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [important, setImportant] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false); // Show inputs only after clicking Add Task

  const handleAddTask = () => {
    setIsAdding(true);
  };

  const handleSaveTask = () => {
    if (task) {
      dispatch(
        addTask({ id: uuidv4(), text: task, priority, important, dueDate })
      );
      setTask("");
      setPriority("Medium");
      setImportant(false);
      setDueDate("");
      setIsAdding(false);
    }
  };

  return (
    <div className="task-input-container d-flex justify-content-center align-items-center mt-3">
      {!isAdding ? (
        <button
          className="btn px-4 py-2"
          onClick={handleAddTask}
          style={{ backgroundColor: "#a8e4a0" }}
        >
          + Add Task
        </button>
      ) : (
        <div
          className="task-form bg-light p-3 rounded shadow d-flex align-items-center gap-3"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="form-control"
            style={{ flex: 2 }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
            style={{ flex: 1 }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <span
            onClick={() => setImportant(!important)}
            style={{ cursor: "pointer", fontSize: "24px" }}
          >
            {important ? "★" : "☆"}
          </span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            style={{ flex: 1 }}
          />
          <button
            className="btn px-3 py-2"
            onClick={handleSaveTask}
            style={{ backgroundColor: "#a8e4a0" }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
