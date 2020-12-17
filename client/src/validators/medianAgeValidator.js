const medianAgeValidator = (value, isRequired, min, max) => {
    if(isRequired && !value) return 'Required Filed'
    else if(!/^\s*[1-9][0-9][0-9]?\s*$/.test(value)) return 'Invalid age'
    else{
        if(parseInt(value) < parseInt(min) || parseInt(value) > parseInt(max))
            return 'Out Of Age Range'
    }
}

export default medianAgeValidator