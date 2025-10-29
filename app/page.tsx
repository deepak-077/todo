"use client"

import { useState } from "react";
export default function Home() {
  
  // State variables
  const [newTodo,setNewTodo]=useState("")

  const [todos,setTodos]=useState([
    {id:1,title:"wake up 4:30 am", done:true},
    {id:2,title:"Go to gym", done:false},
    {id:3,title:"Meditate", done:false},
    {id:4,title:"Run 3kms", done:true},
    {id:5,title:"Study 2 hours", done:true},

  ])

  const completed=todos.filter(a=>a.done===true);
  
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
