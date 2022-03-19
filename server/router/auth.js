const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async(req,res)=>{
     try{
         const{username, password} =req.body;

         if(!username || !password){
             return res.status(406).json({error:"Fields are empty"})
         }

           
         const userLogin = await User.findOne({username:username});
        
         if(userLogin){
            
            const token = await userLogin.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });

            
           if(!userLogin) {
           res.json({message:"Try again"})

         }else{
            
            res.json({message:"signin Successfull"})
         }
         
         }
        }catch(err){
         console.log(err)
     }
});

          router.get('/logout',(req,res)=>{
              res.clearCookie("jwtoken",{path:'/'})
               res.status(200).send("Logout Successfull")
          })


module.exports = router;