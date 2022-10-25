const fs = require('fs')
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')

// Configure dotenv
dotenv.config()

const app = express()
app.use(express.json());
const routesPath = path.resolve(__dirname, '..', 'app', 'routes')

for (const routeFile of fs.readdirSync(routesPath)) {

    const { ext, name } = path.parse(routeFile)
    const filePath = path.join(routesPath, name)

    if (ext == '.js')
        app.use('/' + name.replace('.route', ''), require(filePath))

}

// Body Parser


module.exports = {
    getRoutedApp: () => app
}