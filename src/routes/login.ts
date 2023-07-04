import { Router } from "express"
import {
  registerController,
  authController,
  usersController
} from "../controllers/login/login"
import { checkJwt } from "../middleware/session"

const router = Router()
/**
 * i. Endpoint 1: Registrar usuario con lo siguientes campos (no requiere JWT):
    1. Mail
    2. Password
 */
router.post("/register", registerController)
/**
 * ii. Endpoint 2: Autenticación de usuarios previamente creado en el punto a) i) (No requiere JWT, pero si debe generar uno en el response.)
 */
router.post("/authenticate", authController)
/**
 * iii. Endpoint 3 : Listar usuarios (Requiere JWT y llama al endpoint 4 del modulo de Negocios)
 */
router.get("/users", checkJwt, usersController)

export { router }
