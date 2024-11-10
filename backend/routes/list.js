const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');

router.post("/addTask",async (req,res) => {
   try{
    const {title,body,email} = req.body;
    const euser = await User.findOne({email});
    if(euser){
        const list = new List({title,body,user:euser});
        await list .save().then(()=>{
            res.status(200).json({list});
        })
        euser.list.push(list);
        euser.save();
    }
   }
   catch(error){
    console.error("Error adding task:", error);
       res.status(500).json({ message: "Failed to add task" });

   }
});


router.put("/updateTask/:id",async (req,res) => {
    try{
     const {title,body,email} = req.body;
     const euser = await User.findOne({email});     
     if(euser){
        const updatedTask = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated" });
     }
    }
    catch(error){
     console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
 
    }
 });

 router.delete("/delTask/:id",async (req,res) => {
    try{
     const {email} = req.body;
     const euser = await User.findByIdAndUpdate({email},{$pull: {list: req.params.id}});
     
     if(euser){
        const del = await List.findByIdAndDelete(
            req.params.id
        );
        if (!del) {
            return res.status(400).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task Deleted" });
     }
    }
    catch(error){
     console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to delete task" });
 
    }
 });


 router.get("/getTask/:id",async(req,res)=>{
    const list = await List.find({user: req.params.id}).sort({createdAt:-1});
    if(list.length !==0 ){
        res.status(200).json({list});
    }
    else{
        res.status(200).json({message:"No Tasks found"});
    }    
 });


 router.patch("/toggleComplete/:id", async (req, res) => {
    try {
        const task = await List.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed;
        await task.save();
        res.status(200).json({ message: `Task marked as ${task.completed ? "complete" : "incomplete"}`, task });
    } catch (error) {
        console.error("Error updating task completion status:", error);
        res.status(500).json({ message: "Failed to update task completion status" });
    }
});



module.exports = router;