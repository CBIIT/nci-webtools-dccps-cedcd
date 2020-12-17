const maxAgeValidator = (value, isRequired, minAge) => {
    if(isRequired && value === '')
        return 'Required Filed'
    else if(!/^\s*[1-9][0-9][0-9]?\s*$/.test(value))
        return 'Invalid age'
    else{
        if(minAge && parseInt(value) < parseInt(minAge))
            return 'Max Age Is Less Than Min Age'
    }
}

export default maxAgeValidator