
import { PrismaClient } from "@prisma/client";

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";


const prisma= new PrismaClient

const app=express()
app.use(cors());
app.use(express.json())

app.get("/todos",async(req:Request,res:Response)=>{
    try{
        const todos=await prisma.todo.findMany();
        res.json(todos)

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Failed to fetch todos"})

    }
})

app.post("/todos", async (req:Request,res:Response)=>{
    const {title,done}=req.body;
    console.log("Incoming data:", req.body);
    try{
        const todo=await prisma.todo.create({
            data: {
                title:title,
                done:done
            },
    })
    res.status(201).json({msg:"todo created successfully"})

    }
    catch(error){
        console.log("Error",error)
        res.status(500).json({ error: "Failed to add todo" });
    }
    
})



app.listen(3001, ()=>{
    console.log("server running ")
})
