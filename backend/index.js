const express = require("express")
const app = express();
const cors =require("cors")
const {Task, User} = require("./db/db")
const {createTask,updateTask} = require("./types")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const fetchuser = require("./middleware/fetchuser");

app.use(cors())
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const {username,password} =req.body
    if(!username){
        return res.status(204).json({message : "Invalid Credentials"})
    }
    if(!password){
        return res.status(204).json({message : "Invalid Credentials"})
    }
    try{
        const user = await User.create({username, password})
        await user.save()
        if(user){
            const token = jwt.sign(username,JWT_SECRET)
            return res.status(200).json({
                message : "Signup successfull",
                token : token
            })
        }
        return res.status(404).json({
            error: "Some error occurred"
        })
    }catch(e){
        return res.status(500).json({error : e.message})
    }
})

app.post("/signin",async(req,res)=>{
    const {username, password} = req.body;
    if(!username){
        return res.status(204).json({message : "Invalid Credentials"})
    }
    if(!password){
        return res.status(204).json({message : "Invalid Credentials"})
    }
    try{
        const user =await User.findOne({username, password});
        if(!user){
            return res.status(401).json({
                message : "User not found"
            })
        }
        const token = jwt.sign(username,JWT_SECRET);
        return res.status(200).json({
            message : "Successfully logged in",
            token : token
        })
    }catch(e){
        return res.status(500).json({error : e.message})
    }
})

app.get("/task",fetchuser, async (req,res)=>{
    // get all tasks from the database
    try {
        const user =  await User.findOne({username : req.user})
        const tasks = await Task.find({ user: user._id }); 
        return res.status(200).json({ tasks });
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return res.status(500).json({ error: "Server error" });
      }
})

app.post("/task",fetchuser,async (req,res)=>{ 
    // create new task 
    const {title,description} = req.body;
    const parseddata = createTask.safeParse(req.body)
    if(!parseddata.success){
        return res.status(400).json({
            error : "Invalid inputs"
        })
    }
    const user =await User.findOne({username: req.user})
    const task =await Task.create({title,description,user: user._id})
    await task.save();
    if(!task){
        return res.status(400).json({
            message : "Failed to create task"
        })
    }
    return res.status(201).json({
        message : "Successfully created task",
        task :  task
    })
})

app.put("/completed/:id",fetchuser,async(req,res)=>{
    try {
        const { completed } = req.body;
        const task = await Task.findById(req.params.id);
        const user =await User.findOne({username: req.user})
        
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
      
        if (task.user.toString() !== user._id.toString()) {
          return res.status(403).json({ message: "Not allowed to update this task" });
        }
       
        task.completed = completed;
        await task.save();
      
        res.status(200).json({ message: "Task updated successfully", task });
      } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
      
})

app.put("/task/:id",fetchuser, async (req,res)=>{
    // find the task with id
    const parseddata = updateTask.safeParse(req.body)
    if(!parseddata.success){
        return res.status(400).json({
            error : "Invalid inputs"
        })
    }
    try {
        const { description, title} = req.body;
        if (!req.params.id) {
            return res.status(404).send("Not Found")
        }
        const user = await User.findOne({username: req.user})
        let task = await Task.findById(req.params.id)
        
        if (task.user.toString() !== user._id.toString()) {
            return res.status(404).send("Not Allowed")
        }
       task = await Task.findByIdAndUpdate(req.params.id, {title : title,description : description})
        await task.save()
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({error : "Internal server Error",msg : error.message})
    }
})

app.delete("/task/:id",fetchuser,async (req,res)=>{
    // delete the task with id 
    try {
        let task = await Task.findById(req.params.id);
        const user =await User.findOne({username: req.user})

        if (!task) {
            return res.status(404).json({error : "Not Found"})
        }
        if (task.user.toString() !== user._id.toString()) {
            return res.status(404).json({message : "Not Allowed"})
        }
        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "task has been deleted", task: task });
    } catch (error) {
        res.status(500).send("Internal server Error ")
    }
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})
