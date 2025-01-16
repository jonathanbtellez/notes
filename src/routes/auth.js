import { Router } from "express";
import { login, signIn } from "../controller/auth.js";

const routerAuth = Router();

routerAuth.post('/register', signIn);
routerAuth.post('/login', login);

export { routerAuth };