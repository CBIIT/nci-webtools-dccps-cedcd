const emailValidator = (value, isRequired = false) => {
    if (isRequired && !value)
        return 'Missing required field'
    else if (value && !/^[a-zA-Z0-9.!#$;?%&*+\/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.trim()))
        return 'Invalid Email'
}

export default emailValidator