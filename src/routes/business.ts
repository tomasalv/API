import { Router } from "express"
import { getUsersController } from "../controllers/business/users"
import { validateOrigin } from "../middleware/validateOrigin"
import { checkJwt } from "../middleware/session"

const router = Router()
/**
 * Endpoint 4: Solo es accesible por medio del endpoint 3, no se debe poder acceder al mismo por el endpoint 4.
 */
router.get("/users", validateOrigin, checkJwt, getUsersController)

export { router }
