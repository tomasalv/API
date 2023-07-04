import connectToDatabase from "./config/database"
import { app } from "./app"

const PORT = process.env.PORT || 3000
connectToDatabase()

app.listen(PORT, () => {
  console.log("listening on port", PORT)
})
