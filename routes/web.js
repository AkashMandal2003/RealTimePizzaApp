const homeController=require("../app/http/controllers/homeController");
const authController=require("../app/http/controllers/authController");
const cartController=require("../app/http/controllers/customers/cartController");
const orderController=require("../app/http/controllers/customers/orderController");
const AdminOrderController=require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");

//Middlewares
const guest=require("../app/http/middlewares/guest");
const auth=require("../app/http/middlewares/auth");
const admin=require("../app/http/middlewares/admin");

function initRoutes(app){

    app.get("/",homeController().index)

    
    app.get("/login",guest,authController().login)
    app.get("/register",guest,authController().register)

    app.post("/login",authController().postLogin)
    app.post("/register",authController().postRegister)
    
    app.post("/logout",authController().logout)

    
    app.get("/cart",cartController().index)
    app.post("/update-cart",cartController().update)
    app.post("/remove-item", cartController().removeItem);
    

    //Customer Routes
    app.post("/orders",auth,orderController().store);

    app.get("/orders",auth,orderController().index);

    app.get("/orders/:id",auth,orderController().show);

    //Admin routes
    app.get("/admin-orders",admin,AdminOrderController().index);

    app.post("/admin-orders/status",admin,statusController().update);

}

module.exports=initRoutes