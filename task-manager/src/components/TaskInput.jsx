const TaskInput = ({ value, priority, onChange, onAddTask }) => {
  return (
    <div>
      <input
        name="title"
        type="text"
        placeholder="Task Title"
        value={value}
        onChange={onChange}
      />
      <select name="priority" value={priority} onChange={onChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="button" onClick={onAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
