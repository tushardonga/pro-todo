import React, { useEffect, useState } from "react";
import ChildTask from "./ChildTask";
import ParentTaskList from "./ParentTaskList";

const intialData = [
  {
    Youtube: [
      { id: 1, taskName: "record todo list video", completed: false },
      { id: 2, taskName: "another task", completed: false },
      { id: 3, taskName: "a third task", completed: false },
      { id: 4, taskName: "a fourth task", completed: false },
    ],
  },
  {
    Work: [
      { id: 1, taskName: "Work 1", completed: false },
      { id: 2, taskName: "another task", completed: false },
      { id: 3, taskName: "a third task", completed: false },
    ],
  },
  {
    Grocery: [
      { id: 1, taskName: "Buy thing 1", completed: false },
      { id: 2, taskName: "Buy thing 2", completed: false },
      { id: 3, taskName: "Buy thing 3", completed: false },
    ],
  },
];

const TaskManager = () => {
  const [taskList, setTaskList] = useState(intialData);
  const [activeTask, setActiveTask] = useState("Youtube");
  const [childTaskList, setChildTaskList] = useState(taskList[0]);
  const [remainingTask, setRemainingTask] = useState(0);
  const [childTask, setChildTask] = useState("");

  const getRemainingTaskCount = () => {
    let tempChildTask = Object.entries(childTaskList)[0][1];
    const count = tempChildTask.filter((item) => !item.completed).length;
    setRemainingTask(count);
  };

  useEffect(() => {
    getRemainingTaskCount();
  }, [childTaskList]);

  const addParentTask = (task) => {
    let tempList = taskList;
    let taskObject = { [task]: [] };
    tempList.push(taskObject);
    setTaskList([...tempList]);
  };

  const addChildTask = () => {
    let tempList = taskList;
    let tempChildList = childTaskList;
    Object.entries(tempChildList)[0][1].push({
      id: Object.entries(tempChildList)[0][1].length + 1,
      taskName: childTask,
      completed: false,
    });
    let activeTabIndex = tempList.findIndex(
      (item) => Object.keys(item) === activeTask
    );
    tempList[activeTabIndex] = tempChildList;
    setTaskList([...tempList]);
    getRemainingTaskCount();
  };

  const handleChildSubmit = (e) => {
    e.preventDefault();
    if (childTask.trim()) {
      addChildTask();
      setChildTask("");
    } else return;
  };

  const clearCompleted = () => {
    let tempList = taskList;
    let activeTabIndex = tempList.findIndex(
      (item) => Object.keys(item)[0] === activeTask
    );
    let childList = Object.entries(tempList[activeTabIndex])[0][1].filter(
      (item) => !item.completed
    );
    tempList[activeTabIndex][activeTask] = childList;
    setTaskList([...tempList]);
    setChildTaskList({ ...tempList[activeTabIndex] });
  };

  const deleteMainItem = () => {
    let activeTabIndex = taskList.findIndex(
      (item) => Object.keys(item)[0] === activeTask
    );
    let tempList = taskList.filter(
      (item) => Object.keys(item)[0] !== activeTask
    );
    setActiveTask(Object.keys(tempList[activeTabIndex - 1])[0]);
    setChildTaskList(tempList[activeTabIndex - 1]);
    setTaskList([...tempList]);
  };

  return (
    <>
      <ParentTaskList
        taskList={taskList}
        addParentTask={addParentTask}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        setChildTaskList={setChildTaskList}
      />
      <div className="todo-list">
        <div className="todo-header">
          <h2 className="list-title">{activeTask}</h2>
          <p className="task-count">{remainingTask} tasks remaining</p>
        </div>

        <div className="todo-body">
          <ChildTask
            childTaskList={childTaskList}
            setTaskList={setTaskList}
            taskList={taskList}
            setChildTaskList={setChildTaskList}
          />
          <div className="new-task-creator">
            <form onSubmit={handleChildSubmit}>
              <input
                type="text"
                className="new task"
                placeholder="new task name"
                aria-label="new task name"
                onChange={(e) => setChildTask(e.target.value)}
                value={childTask}
              />
              <button
                type="submit"
                className="btn create"
                aria-label="create new task"
              >
                +
              </button>
            </form>
          </div>

          <div className="delete-stuff">
            <button
              onClick={clearCompleted}
              type="button"
              className="btn delete"
            >
              Clear completed tasks
            </button>
            <button
              onClick={deleteMainItem}
              type="button"
              className="btn delete"
            >
              Delete list
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
