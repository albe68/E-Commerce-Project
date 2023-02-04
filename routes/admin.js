var express = require("express");
var router = express.Router();
const adminController=require("../controller/adminController")

router.get("/", function (req, res) {
  res.render("admin/admin-dashboard", { layout: "adminLayout" });
});
/* GET users listing. */
router.get("/login",adminController.getAdminLogin)
// Post Admin Login Router//
router.post("/login", adminController.postAdminlogin);

router.get('/products',adminController.Products)
//add product//
router.get("/add-product",adminController.getAddProducts);
router.post("/add-products",adminController.postAddProduct);
//edit product//
router.get("/edit-product/:id",adminController.getEditProducts);
// router.post("/edit-products/:id",adminController.postEditProducts);
//delete product//
router.get("/products/delete-product/:id",adminController.getdeleteProducts)

router.get("/add-category",adminController.getAddCategory)
router.post("/add-category",adminController.postAddCategory)

//USERS
router.get('/users',adminController.Users)

module.exports = router;
