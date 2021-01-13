const minAgeValidator = (value, isRequired, maxAge, median, mean) => {
    if(isRequired && value === '')
        return 'Required Field'
    else if(!/^\s*[0-9][0-9]?\s*$/.test(value))
        return 'Invalid age'
    else if(maxAge && parseInt(value) > parseInt(maxAge))
            return 'Min age is greater than max age'
    else{
        if(median && +value > median)
            return 'Min age is greater than age median'
        if(mean && +value > mean ) return 'Min age is greater than age mean'
    }
}

export default minAgeValidator