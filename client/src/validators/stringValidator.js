const stringValidator = (value, isRequired) => {
    if(isRequired && !value)
        return 'missing required field value'
    //else if(value && !/^\s*[^<>]+\s*$/.test(value))
    //   return "'>' or '<' is not allowed"
}

export default stringValidator