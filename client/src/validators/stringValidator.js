const stringValidator = (value, isRequired) => {
    if(isRequired && !value)
        return 'Please provide a value'
    else if(!/^\s*[^<>]+\s*$/.test(value))
        return "'>' or '<' is not allowed"
}

export default stringValidator