const minAgeValidator = (value, isRequired, maxAge) => {
    if(isRequired && value === '')
        return 'Required Field'
    else if(!/^\s*[1-9][0-9][0-9]?\s*$/.test(value))
        return 'Invalid age'
    else{
        if(maxAge && parseInt(value) > parseInt(maxAge))
            return 'Min age is greater than max age'
    }
}

export default minAgeValidator