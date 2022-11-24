const fs = require('fs')
const path = require('path')

const getErrName = (errModule) => {
    err_name = err_module.replace('.error.js', 'Error')
    err_name = err_name[0].toUpperCase() + err_name.substring(1)
    return err_name
}

const errors =  {}

const err_dir = path.resolve(__dirname, '..', 'classes', 'sub')
err_modules = fs.readdirSync(err_dir)

for (err_module of err_modules) {
    err_name = getErrName(err_module)
    err_mod_path = err_dir + '/' + err_module

    errors[err_name] = require(err_mod_path)
}

module.exports = errors