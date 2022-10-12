const { isNumeric } = require('./aux.util')

module.exports = {
    
    authHeaderIsInvalid : (auth_header) => {
    
        if(auth_header == undefined)
        return true
        
        const tokenType = auth_header.split(' ')[0].toLowerCase()
        if(tokenType !== 'bearer')
            return true

        return false

    },

    emailIsInvalid : (email) => {
        const postfixIsValid = postfix => postfix == "student.unsri.ac.id" || postfix == "students.ilkom.unsri.ac.id"
        const [prefix, postfix] = email.split('@')
        
        if(!isNumeric(prefix))
            return true
        
        if(!postfixIsValid(postfix))
            return true

        return false
    },

    getToken : (auth_header) => {
        return auth_header.split(' ')[1]
    }
    
}