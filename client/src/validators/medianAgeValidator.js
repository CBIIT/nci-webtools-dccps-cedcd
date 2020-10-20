const medianAgeValidator = (value, isRequired, min, max) => {
    if(isRequired && !value) return 'Please provide a value'
    else if(!/^\s*[1-9][0-9][0-9]?\s*$/.test(value)) return 'Invalid age'
    else{
        if(parseInt(value) < parseInt(min) || parseInt(value) > parseInt(max))
            return 'Out of age range'
    }
}

export default medianAgeValidator