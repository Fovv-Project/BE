const { getRoutedApp } = require('../utils/app.util')

// Initiates app
const app = getRoutedApp()
const port = process.env.port || 3000
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
})