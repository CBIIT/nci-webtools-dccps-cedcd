const minAgeValidator = (value, isRequired, maxAge, median, mean) => {
    if(isRequired && value === '')
        return 'Required Field'
        else if(+value< 0 || +value >= 1000){
        return 'Invalid age'
    }
    else if(maxAge && parseInt(value) > parseInt(maxAge))
            return 'Min age is greater than max age'
    else{
        if(median && +value > median)
            return 'Min age is greater than age median'
        if(mean && +value > mean ) return 'Min age is greater than age mean'
    }
}

export default minAgeValidator