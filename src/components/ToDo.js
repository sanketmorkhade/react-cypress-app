import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';

export default function Todo() {
  const [todoArray, setTodoArray] = useState([]);
  const [task, setTask] = useState('');
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList) {
      setTodoArray(todoList);
    }
  }, []);

  const onChangeTask = e => {
    setTask(e.target.value);
  };

  const updateLocalStorageFunc = (data) => {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  const addTaskFunc = (e) => {
    e && e.preventDefault();
    console.log(e)
    const newTaskObj = {
      name: task,
      is_done: false,
      is_editing: false,
      id: new Date().getTime()
    }
    const newTodoArray = [...todoArray, newTaskObj];
    updateLocalStorageFunc(newTodoArray);
    setTask('');
    setTodoArray(newTodoArray);
  };

  const editFunc = ({ id, name }) => {
    const newTodoArray = todoArray.map(todo => {
      return { ...todo, is_editing: todo.id === id && !todo.is_editing }
    });
    setEditTask(name);
    setTodoArray(newTodoArray)
  };

  const editTaskFunc = task => {
    setEditTask(task);
  };

  const saveEditTask = ({ id }) => {
    const newTodoArray = todoArray.map(todo => {
      const isIdEqual = todo.id === id;
      return {
        ...todo,
        ...(isIdEqual && { name: editTask }),
        is_editing: isIdEqual && !todo.is_editing
      }
    });
    updateLocalStorageFunc(newTodoArray);
    setEditTask('');
    setTodoArray(newTodoArray)
  };

  const deleteFunc = ({ id }) => {
    const newTodoArray = todoArray.filter(todo => todo.id !== id);
    updateLocalStorageFunc(newTodoArray);
    setTodoArray(newTodoArray)
  };

  const doneFunc = ({ id }) => {
    const newTodoArray = todoArray.map(todo => {
      return { ...todo, is_done: todo.id === id || todo.is_done }
    });
    updateLocalStorageFunc(newTodoArray);
    setTodoArray(newTodoArray)
  };

  return (
    <div>
      <div className="heading">
        <h2>ToDo List</h2>
      </div>

      <form id="task-form">
        <TextField
          id="task-input-field"
          data-cy="task-input-field"
          autoComplete="off"
          value={task}
          name="name"
          onChange={onChangeTask}
          placeholder="Add TO DO"
        />
        <Button
          className="add-btn"
          data-cy="add-btn"
          variant="contained"
          color="primary"
          size="small"
          type='submit'
          disabled={task == ''}
          onClick={addTaskFunc}
        >
          Add
        </Button>
      </form>

      {todoArray.length > 0
        ? <div className='todo-list'>
          <table className="centerTable" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoArray.map((object, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {object.is_editing
                        ? <TextField
                          id="edit-input-field"
                          data-cy="edit-input-field"
                          value={editTask}
                          onChange={e => editTaskFunc(e.target.value)}
                        />
                        : <span className={object.is_done ? 'task-done' : ''}>{object.name}</span>}
                    </td>
                    <td>
                      {object.is_editing
                        ? <div>
                          <Button
                            className="save-btn"
                            data-cy="save-btn"
                            variant="outlined"
                            color="primary"
                            size="small"
                            disabled={editTask == ''}
                            onClick={e => saveEditTask(object)}
                          >
                            Save
                          </Button>
                          <Button
                            className="cancel-btn"
                            data-cy="cancel-btn"
                            variant="outlined"
                            color=""
                            size="small"
                            onClick={e => editFunc(object)}
                          >
                            Cancel
                          </Button>
                        </div>
                        : <div>
                          <Button
                            className="edit-btn"
                            data-cy="edit-btn"
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={e => editFunc(object)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="done-btn"
                            data-cy="done-btn"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            disabled={object.is_done}
                            onClick={e => doneFunc(object)}
                          >
                            Done
                          </Button>
                          <Button
                            className="delete-btn"
                            data-cy="delete-btn"
                            variant="outlined"
                            size="small"
                            onClick={e => deleteFunc(object)}
                          >
                            Delete
                          </Button>
                        </div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        : <h2 className='watermark'>Nothing to do!</h2>}
    </div>
  );
}
