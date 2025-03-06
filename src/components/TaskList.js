import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  toggleTaskCompletion,
  toggleTaskImportance,
} from "../redux/actions";
import {
  FaBell,
  FaCalendar,
  FaPlus,
  FaSync,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const TaskList = ({ sidebarOpen, setSidebarOpen }) => {
  const tasks = useSelector((state) => state.tasks);
  const username = useSelector((state) => state.username);
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const [filterType, setFilterType] = useState("all"); // 'all', 'today', 'important'
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState("None");
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState("");

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      setSteps([...steps, newStep]);
      setNewStep("");
    }
  };

  // Filtering tasks based on selection
  let filteredTasks = sortedTasks;
  if (filterType === "today") {
    filteredTasks = sortedTasks.filter((task) => task.dueDate === currentDate);
  } else if (filterType === "important") {
    filteredTasks = sortedTasks.filter((task) => task.important);
  }

  // Separate active and completed tasks
  const activeTasks = filteredTasks
    ? filteredTasks.filter((task) => !task.completed)
    : [];
  const completedTasks = filteredTasks
    ? filteredTasks.filter((task) => task.completed)
    : [];

  return (
    /* Left side bar for task filters */
    <div className="task-list-container text-center mt-4">
      {sidebarOpen && (
        <div
          className="sidebar bg-light p-3"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "250px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
          }}
        >
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
          <p>
            <strong>Hey, {username}!</strong>
          </p>
          <hr />
          <p
            onClick={() => setFilterType("today")}
            style={{ cursor: "pointer", color: "black" }}
          >
            📅 Tasks Scheduled for Today
          </p>
          <hr />
          <p
            onClick={() => setFilterType("important")}
            style={{ cursor: "pointer", color: "black" }}
          >
            ⭐ Important Tasks
          </p>
          <hr />
          <p
            onClick={() => setFilterType("all")}
            style={{ cursor: "pointer", color: "black" }}
          >
            📋 All Tasks
          </p>
          <hr />
        </div>
      )}

      {/* Header Title Based on Filter */}
      <h3>
        {filterType === "today"
          ? "Today's Tasks"
          : filterType === "important"
          ? "Important Tasks"
          : "All Tasks"}
      </h3>

      {/* Active Tasks List */}
      <ul className="list-group mx-auto" style={{ maxWidth: "600px" }}>
        {activeTasks.length > 0 ? (
          activeTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center border-bottom"
              onClick={() => setSelectedTask(task)}
            >
              <div>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTaskCompletion(task.id))}
                />
                {task.text} -{" "}
                <span
                  className={`badge bg-${
                    task.priority === "High"
                      ? "danger"
                      : task.priority === "Medium"
                      ? "warning"
                      : "secondary"
                  }`}
                >
                  {task.priority}
                </span>
                <span
                  className="ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleTaskImportance(task.id));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {task.important ? "★" : "☆"}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted">No tasks available.</p>
        )}
      </ul>

      {/* Completed Tasks List */}
      <h3 className="mt-4">Completed Tasks</h3>
      <ul className="list-group mx-auto" style={{ maxWidth: "600px" }}>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center text-decoration-line-through border-bottom"
              onClick={() => setSelectedTask(task)}
            >
              <div>
                <input
                  type="checkbox"
                  className="me-2"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTaskCompletion(task.id))}
                />
                {task.text} -{" "}
                <span className="text-muted">{task.priority}</span>
                <span
                  className="ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleTaskImportance(task.id));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {task.important ? "★" : "☆"}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted">No completed tasks.</p>
        )}
      </ul>

      {/* Task Details Sidebar */}
      {selectedTask && (
        <div
          className="sidebar bg-light p-3"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100%",
            width: "300px",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
          }}
        >
          <button
            className="btn bg-light mb-3"
            onClick={() => setSelectedTask(null)}
          >
            <FaTimes />
          </button>
          <h5>Task Details</h5>
          <hr />
          <p>
            <strong>Task:</strong> {selectedTask.text}{" "}
            {selectedTask.important ? "★" : "☆"}
          </p>
          <hr />
          <p>
            <strong>Priority:</strong> {selectedTask.priority}
          </p>
          <hr />
          <p>
            <strong>
              <FaBell />
              Reminder
            </strong>
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={() => setReminderEnabled(!reminderEnabled)}
              className="ms-2"
            />
          </p>
          <hr />
          <p>
            <strong>
              <FaCalendar /> Due Date:
            </strong>{" "}
            {selectedTask.dueDate ? selectedTask.dueDate : "Not Set"}
          </p>
          <hr />
          <p>
            <strong>
              Add Step{" "}
              <i
                className="btn bg-light mt-2"
                onClick={handleAddStep}
                style={{ color: "#3cb371" }}
              >
                <FaPlus />
              </i>
            </strong>
            <input
              type="text"
              className="form-control"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
            />
            <ul>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </p>
          <hr />
          <p>
            <strong>
              <FaSync /> Repeat:
            </strong>{" "}
            <select
              value={repeatFrequency}
              onChange={(e) => setRepeatFrequency(e.target.value)}
              className="form-select ms-2"
            >
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </p>
          <hr />
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteTask(selectedTask.id));
              setSelectedTask(null);
            }}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
