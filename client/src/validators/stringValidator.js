const stringValidator = (value, isRequired) => {
    if(isRequired && !value)
        return 'Please provide a value'
    else if(value && !/^\s*[^<>]+\s*$/.test(value))
        return "'>' or '<' is not allowed"
}

export default stringValidator