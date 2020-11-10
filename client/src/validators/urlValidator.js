const urlValidator = (value, isRequired=false) => {
    if(isRequired && !value)
        return 'please provide a value'
    else if (value && !/^(?:(?:http:\/\/)|(?:https\/\/))?(www\.)?[a-zA-Z\-.0-9]+$/.test(value.trim()))
        return 'invalid url value'
}

export default urlValidator