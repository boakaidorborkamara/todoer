import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  const [task_counter, setTaskCounter] = useState(tasks.length);

  function addTask(task_name) {
    let new_task = { id: uuidv4(), name: task_name.name, completed: false };
    setTask([...tasks, new_task]);
    setTaskCounter(task_counter + 1);
  }

  function toggleTaskCompleted(id) {
    const updateTask = tasks?.map((task) => {
      if (id === task.id) {
        // change the completed value for item which ID matches
        task["completed"] = !task.completed ? true : false;
        setTask([...tasks]);
        return tasks;
      }
    });
  }

  function editTask(id, new_name) {
    tasks.map((task) => {
      if (id === task.id) {
        task.name = new_name;
        setTask([...tasks]);
        console.log(tasks);
      }
    });
  }

  function deleteTask(id) {
    console.log("deleted item id", id);
    console.log(tasks);
    tasks.map((task) => {
      if (id === task.id) {
        let index_of_item_to_delete = tasks.indexOf(task);
        tasks.splice(index_of_item_to_delete, 1);
        setTask([...tasks]);
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
      deleteTask={deleteTask}
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
