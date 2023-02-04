const db=require("../model/connection")
const productHelpers = require("../helpers/productHelpers")
const fileupload=require("express-fileupload")
const { admin } = require("../Model/connection");

const session=require('express-session')
const {response}=require("../app")
const mongoose = require("mongoose");
// const adminHelpers = require("../helpers/adminHelpers");
let adminData={
    username:"admin@gmail.com",
    password:"1",
    name:"Albert"
}
module.exports={
    getAdminLogin:(req,res)=>{
          res.render("admin/login", { layout: "adminLayout" });

    },
    postAdminlogin:(req,res)=>{
        // console.log("hello",adminData)
        if(req.body.email==adminData.username&&req.body.password==adminData.password){
            console.log("vannu")
            res.render("admin/admin-dashboard", { layout: "adminLayout" });
        }
    },
  /*PRODUCTS PAGE*/
  Products:(req,res)=>{
    productHelpers.getAllProducts().then((products)=>{
    // console.log("these are :",products)
    res.render("admin/products", {products,layout: "adminLayout"})
    })
 
  },
//ADD PRODUCTS
getAddProducts: (req, res) => {
      
        // productHelpers
        //   .getAllcategory()
        //   .then((category) => {
            res.render("admin/add-product", {
              layout: "adminLayout",
              
            });
          // })
      },

  postAddProduct: (req, res) => {
  
    productHelpers.addProduct(req.body).then((insertedId) => {
       console.log(insertedId)
        let name = insertedId;
       req.files?.image?.forEach((locals, index) => {
        console.log("helllllllllllllllllllllllllllllllllllllloo")
       locals.mv(
            
       "./public/images/" + name + index + ".png",
        (err, done) => {
        if (!err) {
       console.log("product add");
        } else {
       console.log("error");
        }
        }
        );
        });
        res.redirect("/admin/add-product");
        
      })
      .catch((err) => console.log(err));
  },

  Products:(req,res)=>{
    productHelpers.getAllProducts().then((products)=>{
    // console.log("these are :",products)
    res.render("admin/products", {products,layout: "adminLayout"})
    })
 
  },
  getEditProducts:(req,res)=>
  {
    console.log(req.params.id)
    let proId = req.params.id;
    console.log("get:",proId)
    productHelpers
      .getProduct(proId)
      .then((products) => {
        res.render("admin/edit-product", {
          products,
          layout: "adminLayout",
         
        });
        console.log(products)
      })
      .catch((err) => console.log(err));
  },
  postEditProducts:(req,res)=>{
    let proId=req.params.id;
    let body=req.body
    productHelpers.editProduct().then((products))
  },
  getdeleteProducts:(req,res)=>{
    console.log("THIS ISparams",req.params.id)
    let proId=req.params.id;
    productHelpers.deleteProduct(proId)
    
    .then(() => {
      
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("ERROR"));
  

  },
  getAddCategory:(req,res)=>{
    res.render("admin/add-category",{layout: "adminLayout"})

  },
  
  postAddCategory:(req,res)=>{
    console.log(req.body)
    productHelpers.addCategory(req.body).then((insertedId)=>{
      console.log(insertedId)
    })
  },
  Users:(req,res)=>{
    
    productHelpers.getAllUsers().then((user)=>{
      console.log(user)
      res.render('admin/users',{user,layout:"adminLayout"})
    })
    
  },
  

    } 
    
    

