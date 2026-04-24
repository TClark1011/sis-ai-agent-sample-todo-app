import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name || "");
  const [newDueDate, setNewDueDate] = useState(props.dueDate || "");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(event) {
    setNewName(event.target.value);
  }
  
  function handleDateChange(event) {
    setNewDueDate(event.target.value);
  }

  // NOTE: As written, this function has a bug: it doesn't prevent the user
  // from submitting an empty form. This is left as an exercise for developers
  // working through MDN's React tutorial.
  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName, newDueDate);
    setNewName("");
    setNewDueDate("");
    setEditing(false);
  }
  
  function handleCancel() {
    setNewName(props.name || "");
    setNewDueDate(props.dueDate || "");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
        <label className="todo-label" htmlFor={props.id + '-date'} style={{marginTop: "1rem"}}>
          New due date
        </label>
        <input
          id={props.id + '-date'}
          className="todo-text"
          type="date"
          value={newDueDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={handleCancel}>
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

  const isOverdue = () => {
    if (!props.dueDate || props.completed) return false;
    // We compare with the start of today to see if it's passed
    const due = new Date(props.dueDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  };

  const viewTemplate = (
    <div className="stack-small" style={{ color: isOverdue() ? 'red' : 'inherit' }}>
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
          {props.dueDate && <span style={{display: 'block', fontSize: '0.8em', marginTop: '4px'}}>Due: {props.dueDate}</span>}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setEditing(true);
            setNewName(props.name);
            setNewDueDate(props.dueDate || "");
          }}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
