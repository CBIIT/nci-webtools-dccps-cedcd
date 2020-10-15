const maxAgeValidator = (value, isRequired, minAge) => {
    if(isRequired && !value)
        return 'Please provide a value'
    else if(!/^\s*[1-9][0-9][0-9]?\s*$/.test(value))
        return 'Invalid age'
    else{
        if(minAge && parseInt(value) < parseInt(minAge))
            return 'Invalid max age'
    }
}

export default maxAgeValidator