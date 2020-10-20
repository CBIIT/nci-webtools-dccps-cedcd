import React from 'react'
import {useSelector} from 'react-redux'
//import './QuestionnaireHeader.css'
const pickColor = (status) => {
    switch(status){
        case 'incomplete':
            return 'orange'
        case 'complete':
            return 'green'
        case 'new':
        default: 
            return 'grey'
    }
}

const QuestionnaireHeader = ({...props}) => {
    const sectionStatus = useSelector(state => state.sectionReducer)
    //const regularStyle={flex: '1', width: '37px', height: '37px', border: '3px solid grey', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto'}
    //const activeStyle = {flex: '1', width: '37px', height: '37px', border: '3px solid #f0f', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto'}
    const activeStyle = {color: 'blue', borderBottom: '2px solid blue'}

    return <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1 className='pg-title'>My Questionnaire</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style={{display: 'flex'}}>
        <div id='sectionA' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('A')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['A'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['A']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'A' ? activeStyle : {}}>Basic Information</span></div>
        </div>
        <div id='sectionB' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('B')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['B'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['B']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'B' ? activeStyle : {}}>Enrollment Counts</span></div>
        </div>
        <div id='sectionC' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('C')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['C'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['C']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'C' ? activeStyle : {}}>Major Content</span></div>
        </div>
        <div id='sectionD' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('D')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['D'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['D']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'D' ? activeStyle : {}}>Data Linkage & Harmonization</span></div>
        </div>
        <div id='sectionE' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('E')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['E'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['E']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'E' ? activeStyle : {}}>Cancer Information</span></div>
        </div>
        <div id='sectionF' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('F')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['F'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: pickColor(sectionStatus['F']), margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'F' ? activeStyle : {}}>Cancer Counts</span></div>
        </div>
        <div id='sectionG' style={{flex: '1', textAlign: 'center'}} onClick={() => props.handler('G')}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '1', height: '3px', border: '3px solid #9f3', margin: 'auto 0'}}></div>
                <div style={{flex: '1'}}>
                    <div style={{flex: '1', width: '37px', height: '37px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid ' + pickColor(sectionStatus['G'])}}>
                        <div style={{width: '25px', height: '25px',  borderRadius: '50%', backgroundColor: 'grey', margin: 'auto'}}></div>
                    </div>
                </div>
                <div style={{flex: '1'}}></div>
            </div>
            <div style={{marginTop: '5px'}}><span style={props.activeSection === 'G' ? activeStyle : {}}>Specimens</span></div>
        </div>
    </div>
 </div>
}

export default QuestionnaireHeader