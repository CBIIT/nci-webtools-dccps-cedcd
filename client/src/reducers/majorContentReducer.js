import t from '../actionTypes'
import InitialStates from '../states'
const majorContent = (state=InitialStates.majorContent, action={}) => {
    switch(action.type){
        case t.setSeStatusBaseLine:
        case t.setSeStatusFollowUp:
        default: 
            return state
    }
}

export default majorContent