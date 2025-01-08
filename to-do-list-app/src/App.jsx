import './App.css';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  function handleAddTodo() {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Both title and description are required!");
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
  }

  function handleDeleteTodo(index) {
    const updatedTodos = allTodos.filter((_, idx) => idx !== index);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  }

  function handleComplete(index) {
    let now = new Date();
    let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  function handleDeleteCompletedTodo(index) {
    const updatedTodos = completedTodos.filter((_, idx) => idx !== index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedTodos));
    setCompletedTodos(updatedTodos);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className='App'>
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>

          <div className='todo-input-item'>
            <button type="button" onClick={handleAddTodo} className='primarybtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className='todo-list'>
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                  <TiTickOutline className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            ))}

          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
