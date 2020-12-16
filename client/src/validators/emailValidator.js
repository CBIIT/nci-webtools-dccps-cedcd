const emailValidator = (value, isRequired=false) => {
    if(isRequired && !value)
        return 'missing required field value'
    else if(!/^[a-zA-Z0-9.!#$%&*+\/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.trim()))
        return 'invalid email'
}

export default emailValidator