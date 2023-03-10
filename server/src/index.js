const express = require('express')
const cors = require('cors')

require('./utils/mongodb')

const app = express()

app.use(cors())

app.use("/api", (req, res) => res.json({message: "Health check"}))

app.use((req, res, next) => {
    const err = new Error("Route not found")
    err.status = 404
    next(err)
})


app.use((error, req, res) => {
    res.status(error.status || 500).json({ error: error.message })
})


const PORT = process.env.SERVER_PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)
})