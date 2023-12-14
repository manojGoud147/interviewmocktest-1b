import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = uuid()
    const bgColor = false
    console.log(id)

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [
          ...prevState.myTaskList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {myTaskList, inputTask, selectTag, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)

    return (
      <div>
        <div>
          <h1>Create a task</h1>
          <form onSubmit={this.onClickAddButton}>
            <label htmlFor="textInput">Task</label>
            <input
              id="textInput"
              type="text"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.onChangeInputTask}
            />
            <label htmlFor="optionInput">Tags</label>
            <select
              id="optionInput"
              value={selectTag}
              onChange={this.onChangeSelectTag}
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId}>{eachTag.displayText}</option>
              ))}
            </select>
          </form>
          <button type="button" onClick={this.onClickAddButton}>
            Add Task
          </button>
        </div>
        <div>
          <h1>Tags</h1>
          <div>
            {tagsList.map(eachTag => {
              const isActive = activeTag === eachTag.optionId
              return (
                <ul>
                  <button
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTag}
                  >
                    {eachTag.displayText}
                  </button>
                </ul>
              )
            })}
          </div>
          <h1>Tasks</h1>
          <div>
            {filterTaskList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              <ul>
                {filterTaskList.map(eachTask => (
                  <Tasks taskDetails={eachTask} key={eachTask.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
