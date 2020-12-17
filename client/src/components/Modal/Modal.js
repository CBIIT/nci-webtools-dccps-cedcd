import React from 'react'
import "./Modal.css"
const CenterModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
  return (
    props.show ? 
    <div className="modal display-block">
      <section className="modal-main">
        <div className='modalHeader'>{props.title || <h2>Saving Confirmation</h2>}</div>
        <div className='modalBody'>{props.body || <span>There are validation erros, are you sure to save?</span>}</div>
        <div className='modalFooter'>{props.footer || 
            <div>
            <button className='btn btn-secondary' style={{marginRight: '5px', border: '1px solid #1c8282', backgroundColor: 'white', color: '#1c8282', paddingTop: '5px'}} onClick={props.handleClose}>Close</button>
            <button className='btn btn-primary'  style={{marginRight: '10px'}} onClick={props.handleContentSave}>Save</button>
            </div>
        }
        </div>
      </section>
    </div> : ''
  )
}

export default CenterModal