module.exports = {
    isNumeric : (text) => {
        [...text].forEach(letter => {
          if (isNaN(letter))
            return false
        });
        return true
      }
}