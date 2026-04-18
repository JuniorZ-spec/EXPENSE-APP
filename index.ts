import 'dotenv/config'
import express from 'express'
import { connectDB } from './dbConfig/db.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// Connexion MongoDB avant de démarrer le serveur
connectDB()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})