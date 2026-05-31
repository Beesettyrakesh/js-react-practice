import { useState } from "react";
import FilterBar from "./components/FilterBar";
import TaskCounter from "./components/TaskCounter";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const initialTaskData = {
  id: "",
  title: "",
  priority: "Medium",
  completed: false,
  createdAt: "",
};

function App() {
  const [task, setTask] = useState(initialTaskData);
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");
  const filteredTasks =
    filter === "active"
      ? taskList.filter((task) => !task.completed)
      : filter === "completed"
        ? taskList.filter((task) => task.completed)
        : taskList;

  function handleOnChange(event) {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddTask() {
    if (!task.title.trim()) return;

    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setTaskList((prev) => [...prev, newTask]);
    setTask(initialTaskData);
  }

  function handleToggleTask(taskId) {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleFilterChange(filterValue) {
    setFilter(filterValue);
  }

  function handleDeleteTask(taskId) {
    setTaskList((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <TaskInput
        value={task.title}
        priority={task.priority}
        onChange={handleOnChange}
        onAddTask={handleAddTask}
      />

      {taskList.length > 0 && (
        <>
          <FilterBar onFilterChange={handleFilterChange} filter={filter} />
          <TaskCounter taskList={taskList} />
        </>
      )}

      {taskList.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks match this filter</p>
      ) : (
        <TaskList
          taskList={filteredTasks}
          toggleTask={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
}

export default App;
