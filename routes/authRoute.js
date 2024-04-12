import  Express from "express";
import { registerController, loginController, testController  } from "../controllers/authController.js";
import {isAdmin, authMiddleware} from "../middlewares/authMiddleware.js";


//routes Object
const router = Express.Router();


//routes

//register POST
router.post('/register', registerController);

//Login POST
router.post('/login', loginController);


//test route
router.get('/test', authMiddleware, isAdmin, testController) ;




export default router;