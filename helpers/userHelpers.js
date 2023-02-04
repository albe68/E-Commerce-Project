const db=require("../model/connection")
const bcrypt=require('bcrypt')
// const ObjectId=require('objectid')
const { response } = require("../app")

module.exports={
    //User Signup
    doSignup:(userData)=>{
        console.log("USERDATA BRO",userData)
        return new Promise((resolve,reject)=>{
            db.user.find({
                email:userData.email
            })
            .then(async(email)=>{
                let response={};
                
                if(email.length==0){
                    try{
                        // userData.password=userData.password.toString()
                        userData.password=await bcrypt.hash(userData.password,10)
                        let data=db.user(userData);
                        data.save();
                        response.status=true;
                        response.user=data;
                        resolve(response);
                        // console.log("ayi:",response)
                    }catch(error){
                       
                        // console.log(error);
                    }
                     }
                else{

                    response.status=false;
                    resolve(response);
                    // console.log("ayila:",response)

                    
                }
            })
        })
    },
    doLogin: (loginData) => {
      // console.log("LOGINDATA:",loginData)
        return new Promise(async (resolve, reject) => {
          try {
            let response = {};
            let user = await db.user.findOne({ email: loginData.email });
            if (user) {
              if (user.status) {
                bcrypt
                  .compare(loginData.password,user.password)
                  .then((loginTrue) => {
                    if (loginTrue) {
                      console.log("loginTRUE:",loginTrue)
                      response.status = true;
                      response.user = user;
                      resolve(response);
                    } else {
                      response.status = false;
                      response.user = user;
                      resolve(response);
                    }
                  });
              } else {
                response.user = user;
                resolve(response);
              }
            } else {
              response.status = false;
              resolve(response);
            }
          } catch (error) {
            reject({ error: "Unauthorized Action" });
            console.log(error);
          }
        });
      },
}