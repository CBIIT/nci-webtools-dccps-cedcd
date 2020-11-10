const dateValidator = (value, isRequired) => {
    if(!value && isRequired) return 'Please provide a value'
    else if(value){  
        if(!/^\d\d\/\d\d\/\d{4}$/.test(value.trim()))
            return 'Format MM/dd/yyyy'
        else{
            let dateparts = value.split('/')
            let month = parseInt(dateparts[0])
            let day = parseInt(dateparts[1])
            let year = parseInt(dateparts[2])
            if((month < 1 || month > 12) || (day < 1 || day > 31) || (year < 1 || year > 3000) || ((year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) ? month === 2 && day > 29 : month === 2 && day > 28) || ([4,6,9,11].includes(month) && day > 30))
                return 'Invalid date value'
        }
    }else return ''
}
export default dateValidator