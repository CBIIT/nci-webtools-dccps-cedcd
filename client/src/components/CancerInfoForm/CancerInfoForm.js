import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'

const CancerInfoForm = ({...props}) => {
    const cancerInfo = useSelector(state => state.cancerInfoReducer)
}

export default CancerInfoForm