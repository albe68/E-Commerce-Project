

const mongoose = require("mongoose");
const db = mongoose.createConnection(
  "mongodb://0.0.0.0:27017/store" 
);
const {ObjectID}=require('bson')
const {ObjectId}=require("mongodb");


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});



//User Schema

const userSchema=new mongoose.Schema({
  username:{type:String},
  email:{type:String},
  phoneNumber:{type:String},
  password:{type:String},
  status:{
    type:Boolean,
    default:true
  }
});

//Products Schema
// Products Schema

const productSchema = new mongoose.Schema({
  
  name: {type:String},
  description:{type:String},
  price: {type:String},

  // brand: {type:String},
  // category: {type:String},
  // quantity: {type:Number},
  category:{type:String}
});
// module.exports={
//   user:db.model("user",userSchema)
// }

const categorySchema=new mongoose.Schema({
  cname:{type:String}
})
//Export the model

module.exports={
  user:db.model("user",userSchema),
  products:db.model("products",productSchema),
  category:db.model("category",categorySchema)
}
