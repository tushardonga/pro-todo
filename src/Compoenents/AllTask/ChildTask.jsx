import React from "react";

const ChildTask = (props) => {
  const { childTaskList, setTaskList, taskList, setChildTaskList } = props;
  const childTaskArray = Object.entries(childTaskList)[0][1];

  const handleChildClick = (id) => {
    const selectedTask = childTaskArray.filter((task) => task.id === id)[0];
    selectedTask.completed = !selectedTask.completed;
    const indexOfChild = taskList.findIndex(
      (task) => Object.keys(task)[0] === Object.keys(childTaskList)[0]
    );
    taskList[indexOfChild] = childTaskList;
    setChildTaskList({ ...childTaskList });
    setTaskList([...taskList]);
  };

  return (
    <div className="tasks">
      {childTaskArray.length > 0
        ? childTaskArray.map((item) => (
            <div className="task" key={item.id}>
              <input
                type="checkbox"
                checked={item.completed || false}
                id={item.id}
                onChange={() => handleChildClick(item.id)}
              />
              <label htmlFor={item.id}>
                <span className="custom-checkbox"></span>
                {item.taskName}
              </label>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ChildTask;
