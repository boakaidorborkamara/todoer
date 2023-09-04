import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  const [task_counter, setTaskCounter] = useState("tasks.length");

  function addTask(task_name) {
    let new_task = { id: uuidv4(), name: task_name.name, completed: false };
    setTask([...tasks, new_task]);
    setTaskCounter(task_counter + 1);
  }

  function toggleTaskCompleted(id) {
    const updateTask = tasks?.map((task) => {
      if (id === task.id) {
        // change the completed value for item which ID matches
        let isChecked = !task.completed ? true : false;
        task["completed"] = isChecked;

        return tasks;
      }
    });

    setTask(tasks);
  }

  function editTask(id) {
    console.log("working");
    console.log(id);

    tasks.map((task) => {
      if (id === task.id) {
        console.log(task);
      }
    });
  }

  const taskList = tasks.map((task) => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>ToDoer</h1>
      <Form addTask={addTask} />
      <FilterButton />
      {/* <h2 id="list-heading">{task_counter} tasks remaining</h2> */}
      <h2 id="list-heading">
        {task_counter ? task_counter + " " + "tasks remaining" : "No Task"}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
