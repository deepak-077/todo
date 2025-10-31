"use client"

import { title } from "process";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  
  // State variables
  const [newTodo,setNewTodo]=useState("")
  const [todos,setTodos]=useState<{id:number; title:string; done:boolean}[]>([])

  // filter for completed todos
  const completed=todos.filter(a=>a.done===true);

  useEffect(()=>{
    fetchTodos()
  },[])

  async function fetchTodos(){
    try{
      const response = await axios.get("http://localhost:3001/todos")
      setTodos(response.data)
    }
    catch(error){
      console.log("failed to get todos",error)

    }
  }

  async function deleteTodos(id:number){
    try{
      await axios.delete(`http://localhost:3001/todos/${id}`)
      await fetchTodos()
    }
    catch(error){
      console.log("deletion failed", error)
    }
  }

  async function markAsDone(id:number){
    try{
      await axios.patch(`http://localhost:3001/todos/${id}`,{
        done:true
      })

      // updating at front-end
      setTodos((prev)=>prev.map((todo)=>(todo.id===id?{...todo,done:true}:todo)))
    }
    catch(error){
      console.log("failed to update",error)
    }
  }

  

  async function addTodo(){
    if(!newTodo.trim()){
      return
    }
    try{
      await axios.post("http://localhost:3001/todos",{
        title:newTodo,
        done:false
      })
      setNewTodo("")
      fetchTodos()
    }
    catch(error){
      console.log("failed to add todo", error);
    }
  }
  
  return (
    <div className="bg-gray-700 h-screen text-white">
      {/* All Todos */}
      <div className="w-[500px] text-2xl">
        <h1 className="bg-amber-500  ">All Todos</h1>
        {todos.map((item,index)=>(
          <div className="flex">
            <p key={item.id}>{item.title}</p>

            <button className="bg-lime-500 rounded-full p-2" onClick={()=>{
              markAsDone(item.id)
            }}>Mark As Done</button>

            <button className="bg-red-400 rounded-full p-2" onClick={()=>{
              deleteTodos(item.id)
            }}>Delete Todo</button>
          </div>
          

        ))}
      </div>

      {/* Completed Todos */}
      <div className="w-[500px] text-2xl">
        <h1 className="bg-lime-400  ">All Todos</h1>
        {completed.map((item,index)=>(
          <p key={item.id} className="line-through">{item.title}</p>
        ))}
      </div>

      {/* Add Todo */}
      <div className="flex">
        <input type="text" placeholder="Add new todo" value={newTodo} onChange={(e)=>{
          setNewTodo(e.target.value)
        }} />

        <button onClick={addTodo}>Add Todo</button>
      </div>



    </div>
  );
}
      

