import React, { useState } from "react";

const ParentTaskList = (props) => {
  const {
    activeTask,
    addParentTask,
    taskList,
    setActiveTask,
    setChildTaskList,
  } = props;
  const [parentTask, setParentTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parentTask.trim()) {
      addParentTask(parentTask);
      setParentTask("");
    } else return;
  };

  const handleTaskClick = (task) => {
    setActiveTask(Object.keys(task)[0]);
    setChildTaskList(task);
  };

  return (
    <>
      <div className="all-tasks">
        <h2 className="task-list-title">My lists</h2>
        <ul className="task-list">
          {taskList.length > 0
            ? taskList.map((task) => (
                <li
                  onClick={() => handleTaskClick(task)}
                  key={Object.keys(task)}
                  className={`list-name ${
                    activeTask === Object.keys(task)[0] ? "active-list" : ""
                  }`}
                >
                  {Object.keys(task)}
                </li>
              ))
            : ""}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new list"
            placeholder="new list name"
            aria-label="new list name"
            value={parentTask}
            onChange={(e) => setParentTask(e.target.value)}
          />
          <button
            type="submit"
            className="btn create"
            aria-label="create new list"
          >
            +
          </button>
        </form>
      </div>
    </>
  );
};

export default ParentTaskList;
