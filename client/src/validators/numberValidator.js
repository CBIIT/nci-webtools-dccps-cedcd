const numberValidator = (value, isRequired, allowNegative) =>{
    let pattern = allowNegative ? /^\s*\-?[1-9][0-9]*\s*$/ : /^\s*[1-9][0-9]*\s*$/
    if(isRequired && !value) return 'Please provide a value'
    if(!pattern.test(value)) return 'Invalid value'
}

export default numberValidator