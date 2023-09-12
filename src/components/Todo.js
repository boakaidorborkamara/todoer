import React from "react";
import { useState } from "react";

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedTask, setModifieTask] = useState("");

  function handleSave(e) {
    e.preventDefault();
    props.editTask(props.id, modifiedTask);
    setIsEditing(false);
  }

  function handleCancel(e) {
    setIsEditing(false);
  }

  function handleDelete(e) {
    props.deleteTask(props.id);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSave}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={(e) => {
            setModifieTask(e.target.value);
          }}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={handleCancel}
          className="btn todo-cancel"
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        {console.log("color change", props.completed)}
        <label
          className={props.completed ? "done-task" : "todo-label"}
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
          className="btn"
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={handleDelete}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
