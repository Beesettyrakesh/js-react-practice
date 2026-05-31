const TaskCounter = ({ taskList }) => {
  let activeTasks = taskList.filter((task) => !task.completed).length;
  const allTasks = taskList.length;

  return (
    <>
      <h4>
        {activeTasks} of {allTasks} tasks remaining
      </h4>
    </>
  );
};

export default TaskCounter;
