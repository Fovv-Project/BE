const express = require('express')
const dotenv = require('dotenv')

// Configure dotenv
dotenv.config()

// Initiates app
const app = express()
const port = process.env.port || 3000
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
})