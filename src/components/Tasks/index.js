const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails

  return (
    <li>
      <h1>{taskName}</h1>
      <p>{taskCategory}</p>
    </li>
  )
}
export default Tasks
