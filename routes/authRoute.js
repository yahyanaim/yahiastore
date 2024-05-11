import  Express from "express";
import { registerController, loginController, testController, forgotPasswordController  } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//routes Object
const router = Express.Router();


//routes

//register POST
router.post('/register', registerController);

//Login POST
router.post('/login', loginController);

// Forget Password
router.post('/forgot-password', forgotPasswordController);

//test route
router.get('/test', requireSignIn, isAdmin, testController) ;

// protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  // protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;