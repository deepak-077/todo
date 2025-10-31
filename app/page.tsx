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

    }
    catch(error){
      console.log("failed to get todos")

    }
  }

  

  async function addTodo(){
    if(!newTodo.trim()){
      return
    }
    try{
      await axios.post("localhost://3001/todos",{
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
              setTodos(( prev )=> prev.map((a)=>( a.id===item.id ? {...a,done:true}:a
              )))
            }}>Mark As Done</button>
            <button className="bg-red-400 rounded-full p-2" onClick={()=>{
              setTodos(todos.filter(a=>a.id!==item.id))
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

        <button onClick={()=>{
          const task= { id:todos.length,title:newTodo,done:false }
          setTodos((prev)=>[...prev,task])
          setNewTodo("")

        }}>Add Todo</button>
      </div>



    </div>
  );
}
