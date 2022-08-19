const mongoose =require("mongoose");


const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
          unique:true 
    },
    content:{
        type:String,
        required:true,
         unique:true 
    },

    date:{
        type:Date,
        default:Date.now
    },
    
})


// store the message -------------# 36  4
userSchema.methods.addMessage = async function(title,content,date){
try{
this.messages = this.messages.concat({title,content,date});// message add hogyaa h bss ab save krnaa h
await this.save();
return this.messages;
}catch(err){
    console.log(err);
}
}
// model collection create kr rhe h jiske andr hm bhott sare documents likh skte h
const User =  mongoose.model("User",userSchema);
module.exports = User;
