const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
router.post("/signup",async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const hpass = bcrypt.hashSync(password);
        const user = new User({email,username,password:hpass});
        await user.save().then(()=>{
            res.status(200).json({user:user});
        })
    }
    catch(error){
        res.status(400).json({message:"User Already Exists"})
    }
});




router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Please Signup" });
        }
        const checkPass = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPass) {
            return res.status(400).json({ message: "Wrong Password" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(400).json({ message: "Login Failed" });
    }
});



module.exports = router;
