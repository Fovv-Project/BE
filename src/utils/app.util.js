const fs = require('fs')
const path = require('path')
const express = require('express')

module.exports = {
    getRoutedApp : () => {

        const app = express()
        const routesPath = path.resolve(__dirname, '..', 'routes')    
        
        for (const routeFile of fs.readdirSync(routesPath)){     
            
            const {ext, name} = path.parse(routeFile)
            const filePath = path.join(routesPath, name)
            
            if(ext == '.js')
            app.use('/' + name.replace('.route', ''), require(filePath))       
            
        }
    
        return app
    },
}