import TaskItem from "./TaskItem";

const TaskList = ({ taskList, toggleTask, onDelete }) => {
  return (
    <div>
      {taskList.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          toggleTask={toggleTask}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
