const { getRoutedApp } = require('../utils/app.util')
const cron = require('../utils/cron.util')
const logger = require('../utils/logger.util')

// Initiates app
const app = getRoutedApp()
const port = process.env.port || 3000
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
    try {
        // Cron Jobs
        cron.approvalRejector.start()  
    } catch (err) {
        logger.error('error-handler', err.message)
    }
})