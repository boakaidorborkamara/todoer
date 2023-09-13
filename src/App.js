import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  const [active_tasks, setActiveTasks] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);

  const [completed_tasks, setCompletedTasks] = useState([]);
  const [task_counter, setTaskCounter] = useState(tasks.length);
  const [filter_items, setFilterItems] = useState([
    { id: 1, name: "all", status: true },
    { id: 2, name: "completed", status: false },
    { id: 3, name: "active", status: false },
  ]);

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

  let tryy = "try";
  function getTasksType(name) {
    let selected_tasks = [];

    tasks.map((task) => {
      if (name === "completed" && task.completed === true) {
        console.log(task);

        selected_tasks.push(task);
        console.log("selected tasks", selected_tasks);
        setIsAllSelected(false);
        setIsCompletedSelected(true);
        console.log("is completed", isCompletedSelected);
        console.log("is all", isAllSelected);
        tryy = "new tryy";
        console.log(tryy);
      }
    });

    setCompletedTasks(selected_tasks);
    console.log("edit", completed_tasks);
  }

  const taskList =
    isAllSelected === true
      ? tasks.map((task) => (
          <Todo
            name={task.name}
            completed={task.completed}
            id={task.id}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))
      : isCompletedSelected === true
      ? completed_tasks.map((complete_task) => {
          if (!completed_tasks) {
            console.log("still running");
            return <li>No completed tasks</li>;
            console.log("no completed task");
          } else {
            console.log("else state");
            return (
              <Todo
                name={complete_task.name}
                completed={complete_task.completed}
                id={complete_task.id}
                key={complete_task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            );
          }
        })
      : isActiveSelected === true
      ? active_tasks.map((active_task) => {
          "active tasks";
        })
      : "";

  const filterButtonList = filter_items.map((item) => (
    <FilterButton name={item.name} getTasksType={getTasksType} key={item.id} />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>ToDoer</h1>
      <Form addTask={addTask} />
      {filterButtonList}
      <h2 id="list-heading">
        {task_counter ? task_counter + " " + "tasks remaining" : "No Task"}
      </h2>

      {/* list of tasks  */}
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
