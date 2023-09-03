import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  const [task_counter, setTaskCounter] = useState("tasks.length");
  console.log("ALL TASKS", tasks);

  function addTask(task_name) {
    let new_task = { id: uuidv4(), name: task_name.name, completed: false };
    setTask([...tasks, new_task]);
    setTaskCounter(task_counter + 1);
  }

  function toggleTaskCompleted(id) {
    console.log(id);
    let modified_task;

    const updateTask = tasks?.map((task) => {
      // console.log("Task", task);
      if (id === task.id) {
        console.log(task.id);

        // use object spread to make a new object
        // whose `completed` prop has been inverted

        let isChecked = !task.completed ? true : false;
        task["completed"] = isChecked;
        console.log("MODIFIED TASK", tasks);
        console.log("ALL TASKS in update task fnx", tasks);

        return tasks;
      }
    });

    // let change_item = [...tasks, modified_task];
    // console.log("CHANGE", change_item);
    setTask(tasks);
    // console.log(tasks[id]);
  }

  const taskList = tasks.map((task) => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
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
