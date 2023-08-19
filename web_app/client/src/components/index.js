import React,{useState} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

let initialState = [
    {id:1, message:'Walk'},
    {id:2, message:'Eat'},
    {id:3, message:'Drink'},
];

function TodoParent() {
    let [todoListVar, setTodoListVar] = useState(initialState);
    console.log(todoListVar);

    const deleteHandler=(id)=>{
        const newTodos = todoListVar.filter(item => {
            return item.id !== id
        })
        setTodoListVar(newTodos);
    }
    
    const updateHandler=(todo)=>{
        setTodoListVar(todoListVar.map(item=>{
            if(item.id===todo.id){
                return{
                    ...item,
                    message:todo.message
                }
            }
            else{
                return item;
            }
        }))
    }

  return (
    <div>
        <TodoForm todos={todoListVar} setTodoListVar={setTodoListVar}/>
        <TodoList var_todo={todoListVar} deleteHandler={deleteHandler} updateHandler={updateHandler}/>
    </div>
  )
}

export default TodoParent