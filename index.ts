const app = express()

const PORT = 8000;

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api", apiRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})