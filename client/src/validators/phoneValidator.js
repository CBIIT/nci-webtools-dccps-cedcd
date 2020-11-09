const phoneValidator = (value) => {
    if(value && !/^(?:(?:\(\d\d\d\)-?)|(?:\d\d\d-?))\d\d\d-?\d\d\d\d$/.test(value.trim()))
        return 'invalid phone number'
}

export default phoneValidator