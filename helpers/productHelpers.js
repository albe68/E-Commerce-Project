const { response } = require("express");
const { products, category } = require("../model/connection");
// const { tryParse } = require("objectid");
const db=require("../model/connection")


module.exports = {
  // Get All Product

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
  try{ 
    let products=await db.products.find({});
      resolve(products)
      // console.log(products)
    }catch(error){
      console.log(error)
    }});
  },
  getProduct: (proId) => {
    console.log("proId",proId)
    return new Promise((resolve, reject) => {
      try {
        db.products.find({ _id: proId }).then((products) => {
          resolve(products);
        });
      } catch (error) {
        console.log("error");
      }
    });
  },
  
   // Add Product

   addProduct: (products) => {
    console.log("thing",products)
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.products(products);
      
        data.save();
        resolve(data._id);
        console.log("data",data._id);

      } catch (error) {
        console.log(error);
      }
    });
  },
  editProduct:(proId,body)=>{
    return new Promise(async (resolve,reject)=>{
      try{
        console.log("proId",proId,"||body:",body)
        await db.products.updateOne({_id:proId},
          {
            $set:{
              name:body.name,
              brand:body.brand,
              category:brand.category,
              price:body.price,
              description:body.description
            }
          })
          resolve();
      }
      catch(error){
        console.log(error)
      }
    })
    
  },
  addCategory:(category)=>{
    return new Promise(async(resolve,reject)=>{
      try{
        console.log(category.cname)
        let data=await db.category(category)
        data.save();
        resolve(data._id)
      }catch(error){
        console.log(error)

      }
    })

  },
  deleteProduct:(proId)=>{
    console.log("in helper:",proId)
    return new Promise (async(resolve,reject)=>{
      try{
        await db.products.deleteOne({_id:proId});
        // console.log(_id)
        resolve();
      }
      catch(error){
        console.log(error)      }
    })
  },
  //USERS
  getAllUsers:()=>{
    return new Promise (async(resolve,reject)=>{
      try{
       let user= await db.user.find({});
        resolve(user)
      }catch(error){
        console.log(error);
      }
    })
  }
}

