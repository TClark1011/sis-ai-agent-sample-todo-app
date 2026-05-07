import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  // NOTE: As written, this function has a bug: it doesn't prevent the user
  // from submitting an empty form. This is left as an exercise for developers
  // working through MDN's React tutorial.
  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === "") {
      return;
    }
    props.addTask(name, dueDate);
    setName("");
    setDueDate("");
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleDateChange(event) {
    setDueDate(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder="Task name"
      />
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="new-todo-date" style={{ marginRight: '10px' }}>Due Date:</label>
        <input
          type="date"
          id="new-todo-date"
          className="input"
          name="dueDate"
          value={dueDate}
          onChange={handleDateChange}
        />
      </div>
      <button type="submit" className="btn btn__primary btn__lg" style={{ marginTop: '10px' }}>
        Add
      </button>
    </form>
  );
}

export default Form;
