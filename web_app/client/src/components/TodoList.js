import React from 'react'
import Todo from './Todo'

                //{var_todo} destructure props like this
function TodoList(props) {
  return (
    <div>
      {props.var_todo.map(todo=>{
        return <Todo key={todo.id} todo={todo} deleteHandler={props.deleteHandler} updateHandler={props.updateHandler}/>
      })}
    </div>
  )
}

export default TodoList