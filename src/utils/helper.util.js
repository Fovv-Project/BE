const crypto = require('crypto')

module.exports = {

  isNumeric: (text) => {
    for (letter of text) {
      if (isNaN(letter)) {
        return false
      }
    }
    return true
  },

  getRandom: (type, total) => {

    let characters
    if (type == "letter")
      characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"
    else if (type == "number")
      characters = "0123456789"
    else
      characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ" + "0123456789"

    let result = ""
    for (let index = 0; index < total; index++) {
      result += characters[crypto.randomInt(0, characters.length - 1)]
    }
    return result
    
  },

  isInteger: (string) => isNaN(string) ? false : (Number.isInteger(parseFloat(string)) ? true : false),

  rangedRandomInt : (min, max) => crypto.randomInt(0, max + 1)

}