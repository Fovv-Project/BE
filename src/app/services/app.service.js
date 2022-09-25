const fs = require('fs')
const path = require('path')

module.exports = (app) => {
    const routesPath = path.resolve(__dirname, '..', 'routes')
    const routeFiles = fs.readdirSync(routesPath)
    
    for (const routeFile of routeFiles){
        const {ext, name} = path.parse(routeFile)
        const filePath = path.join(routesPath, name)
        
        if(ext == '.js')
        app.use('/' + name, require(filePath))
        
    }
}