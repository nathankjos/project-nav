const
    express= require('express'),
    usersRouter = new express.Router()
    
userRouter.get("/", (req, res)=>{
    res.send("Users Index")
})