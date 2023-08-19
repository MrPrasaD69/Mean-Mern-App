import React,{useState} from 'react'


function Todo(props) {
    let[isEditing, setIsEditing] = useState(false);
    let[updatedTodo, setUpdatedTodo ] = useState();

    const updateTodoState=(e)=>{
        setUpdatedTodo({
            id:props.todo.id,
            message: e.target.value,
        })
    }

    const updateAndReset=(input, e)=>{
        e.preventDefault();
        props.updateHandler(input);
        setIsEditing=false;
    }

  return (
    <div>
        {isEditing ? 
        <form onSubmit={(e)=>updateAndReset(updatedTodo, e)}>
            <input type='text' defaultValue={props.todo.message} onChange={updateTodoState} />
        </form>
        : 
        <p onDoubleClick={()=> setIsEditing(true)} >{props.todo.message}</p>
        }
        <button onClick={()=>props.deleteHandler(props.todo.id)}>X</button>
    </div>
  )
}

export default Todo