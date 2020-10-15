const yearValidator = (value, isRequired) =>{
    let pattern = /^\s*(?:(19\d\d)|(20\d\d))\s*$/
    if(isRequired && !value) return 'Please provide a value'
    if(!pattern.test(value)) return 'Invalid year'
}

export default yearValidator