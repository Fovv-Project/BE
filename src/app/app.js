const { getRoutedApp } = require('../utils/app.util')
const PageNotFoundHandler = require('./middlewares/pageNotFound.middleware')

// Initiates app
const app = getRoutedApp()
app.use(PageNotFoundHandler)
const port = process.env.port || 3000
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
})