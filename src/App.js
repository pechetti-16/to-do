import React, { useState, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Auth from "./components/Auth";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useSelector } from "react-redux";
import "./App.css";
import { setAuthenticated, setCurrentDate } from "./redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignOutAlt } from "react-icons/fa";
const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentDate = useSelector((state) => state.currentDate);
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    dispatch(setCurrentDate(today));
  }, [dispatch]);

  return (
    <div className="App container mt-4">
      {isAuthenticated && (
        <div
          className="d-flex justify-content-between align-items-center bg-light text-white p-2 rounded"
          style={{
            width: "100%",
            height: "60px",
            display: "flex",
            padding: "0 20px",
          }}
        >
          {/* Left Section */}
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <button
              className="btn btn-light"
              onClick={() => setSidebarOpen(true)}
              style={{ color: "#3cb371", fontSize: 24 }}
            >
              ☰
            </button>
            <h2 className="m-0" style={{ color: "#3cb371", fontSize: 36 }}>
              DoIt
            </h2>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <h4 className="m-0" style={{ color: "#3cb371" }}>
              {currentDate}
            </h4>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(setAuthenticated(false))}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      )}
      <Auth />
      {isAuthenticated ? (
        <>
          <TaskInput />
          <TaskList sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      ) : (
        <p className="text-center mt-3">Please log in to view tasks.</p>
      )}
    </div>
  );
};

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
