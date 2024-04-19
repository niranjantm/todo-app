import express from "express";
import Todo from "../models/todo.model.js";

import errorHandler from "../utils/error-handler.js";

const router = express.Router();




router.get("/api/get/todos",async (req,res,next)=>{
    try{
        const todos = await Todo.findAll();

        res.json(todos)
    }catch(error){
        next(errorHandler(400,'error in getting todo'))
    }
})




router.post("/api/create/todo", async (req,res,next)=>{
    
    const {title} = req.body;
   
    try{
        const todo = await Todo.create({title})
        res.status(201).json(todo);
    }catch(error){
        next(errorHandler(400,'error in creating todo'))
       
    }


})

router.put("/api/update/todo/:id",async (req,res,next)=>{

    const {id} = req.params;
    

    try{
        const updatedTodo = await Todo.update({status:"complete"},{
            where:{id}
        })
        res.status(200).json("update ok")
    }catch(error){
        next(errorHandler(400,'error in updating todo'))
    }
  
})

router.delete("/api/delete/todo/:id",async (req,res,next)=>{
    const {id} = req.params;

    try{
        const deleteTodo = await Todo.destroy({where:{id}})

        res.status(200).json("deletion successful")
    }catch(error){
        next(errorHandler(400,'error in deleting todo'))
    }
})


export default  router