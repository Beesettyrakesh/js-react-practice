const formatter24 = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const TaskItem = ({ task, toggleTask, onDelete }) => {
  const priorityColor =
    task.priority === "High"
      ? "red"
      : task.priority === "Medium"
        ? "orange"
        : "green";

  return (
    <>
      <h4 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        Title: {task.title}
      </h4>

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          backgroundColor: priorityColor,
          color: "white",
          padding: "2px 8px",
          borderRadius: "12px",
        }}
      >
        Priority: {task.priority}
      </span>

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          margin: "5px",
        }}
      >
        Created At: {formatter24.format(task.createdAt)}
      </span>

      <span>
        <input
          type="checkbox"
          onChange={() => toggleTask(task.id)}
          checked={task.completed}
          style={{ margin: "5px" }}
        />
        Done
      </span>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        style={{ margin: "5px" }}
      >
        Delete
      </button>

      <hr />
    </>
  );
};

export default TaskItem;
