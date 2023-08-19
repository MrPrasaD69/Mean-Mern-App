import React,{useState} from 'react'

function TodoForm(props) {
    const initialState={
        id:'',
        message:''
    };
    let [todo, setTodo] = useState(initialState);
    const handleChange=(e)=>{
        setTodo({
                id:Date.now(),
                message: e.target.value
            });
        console.log(todo);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(todo);
        props.setTodoListVar([todo,...props.todos])
        setTodo(initialState);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='todo' value={todo.message} onChange={handleChange} placeholder='Enter Item'/>
            <button type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default TodoForm