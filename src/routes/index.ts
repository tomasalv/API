import { Router } from "express"
import { readdirSync } from "fs"

const PATH_ROUTER = `${__dirname}`
const router = Router()

/**
 * The cleanFileName function takes a file name as input and returns the name without the file
 * extension.
 * @param {string} fileName - The `fileName` parameter is a string that represents the name of a file,
 * including its extension.
 * @returns The function `cleanFileName` returns the file name without the file extension.
 */
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift()
  return file
}

//cargamos las rutas dinámicamente
/* The code is dynamically loading and registering routes in an Express router. */
readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename)
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
