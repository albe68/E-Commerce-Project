const db=require("../model/connection")
const userHelpers=require("../helpers/userHelpers")
const session=require('express-session')
const {response}=require("../app")
const mongoose = require("mongoose");
const productHelpers = require("../helpers/productHelpers");



// const createUser=async(req,res)=>{
//     const email=req.body.email;
//     console.log(req.body)
//     // const findUser=await users.find({email:email});
//     console.log("hi")
//     if(!findUser){
//         console.log(req.body)
//         //create a new User
//         const newUser=await users.create(req.body);
//         res.json(newUser)
//     }
//     else{
//         //user already exsists
//         res.json({msg:"User Already exists",
//     success:false,}) 
//     }
    
// }

// module.exports={createUser}

module.exports={
  home:(req,res)=>{
    // // app.get('/:id', function (req, res) {
    //     console.log(req.params['id']);
    //     res.send();
    //   // });
    res.render("user/user")
   
  },

  // indexPage:async(req,res,next)=>{  
  //   let user=req.session.user;

  //   console.log(user)
  // },

    //getUserSignup
    getUserSignup:(req,res)=>{
      try
      
      {
        
        if(req.session){
        res.redirect("/");
      }
        else{
            res.render("user/signup",{nav:true});
        }
    }catch(error){
      
        console.log(error);
    }

},
//postUser Signup
postUsersignup: (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
        if (response.status) {
          // console.log(req.body)
          req.session.user = response.user;
          req.session.userIn = true;
          res.send({ value: "Success" });
          
        } else {
          // console.log("else:",req.body)
          req.session.userIn = false;
          res.send({ value: "error" });
        }
      })
      .catch((err) => console.log(err));
  },

//User Login
getUsersLogin:(req,res)=>{
      try{
        if(req.session.userIn){
          console.log(req.body)
        
      }
        else{
          console.log(req.body)
            res.render("user/login",{nav:true});
        }
    }catch(error){
      console.log(req.body)
       res.render("user/login")
        console.log(error);
    }

},

  //User Login Post

  postUserSignin: (req, res) => {
    try {
      userHelpers.doLogin(req.body).then((response) => {
        console.log(req.body)
        if (response.status) {
          req.session.user = response.user;
          req.session.userIn = true;
          res.send({ value: "Successlogin", url: req.session.returnUrl });
        } else if (!response.user.status) {
          res.send({ value: "block" });
        } else {
          // res.session.userIn = false;
          // res.send({ value: "errorlogin" });
          res.render('user/login')
        }
      })
      .catch((err) => {
        res.render("/");
        console.log(err);
      });
    } catch (error) {
      res.render("user/500Page");
    }
  
  },
  //List Product
  indexPage:  (req, res,err) => {
    
   try{ let proId=req.params.id
    console.log("proId")
    productHelpers.getAllProducts().then((products)=>{
      console.log("WORKING")
      res.render("user/shop",{products});
      
    })
    .catch((err)=>{
      console.log("ERROR HAPPENED")
    })}
    catch(error){
      console.log("error")
    }
    },
    getProductPage:(req,res)=>{
      res.render("user/view-product")
    }

}

