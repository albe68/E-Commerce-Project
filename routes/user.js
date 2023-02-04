const express = require("express");
const router = express.Router();
const userController=require("../controller/userController")
// const bodyParser = require("body-parser");
const db=require("../model/connection")


/* GET home page. */
router.get("/",userController.home)
// GET sign up//
router.get("/signup",userController.getUserSignup);

// POST sign up//

router.post("/signup",userController.postUsersignup);

router.get("/login",userController.getUsersLogin)
router.post("/login",userController.postUserSignin)

// router.get("/shop", function (req, res, next) {
//   res.render("user/shop");
// });
router.get("/shop",userController.indexPage)
router.get('/view-product',userController.getProductPage)



module.exports = router;
