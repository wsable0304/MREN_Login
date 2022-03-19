const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    role:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});


// generate token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.JWT_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
       console.log(err);
    }
}



const User = mongoose.model('USER', userSchema);

module.exports = User;